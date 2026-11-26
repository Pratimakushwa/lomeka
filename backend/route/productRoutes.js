// const express = require('express');
// const mongoose = require('mongoose');
// const Product = require('../models/Product');

// function normalizeImagePayload(body = {}, existing = null) {
//   const list = [];

//   const primaryInput = Object.hasOwn(body, 'imageUrl')
//     ? String(body.imageUrl || '').trim()
//     : existing?.imageUrl || '';

//   const secondaryInput = Object.hasOwn(body, 'secondaryImageUrl')
//     ? String(body.secondaryImageUrl || '').trim()
//     : existing?.secondaryImageUrl || '';

//   if (primaryInput) list.push(primaryInput);
//   if (secondaryInput && !list.includes(secondaryInput)) {
//     list.push(secondaryInput);
//   }

//   if (Array.isArray(body.images)) {
//     for (const img of body.images) {
//       const clean = typeof img === 'string' ? img.trim() : '';
//       if (clean && !list.includes(clean)) {
//         list.push(clean);
//       }
//     }
//   } else if (!Object.hasOwn(body, 'imageUrl') && !Object.hasOwn(body, 'secondaryImageUrl') && Array.isArray(existing?.images)) {
//     for (const img of existing.images) {
//       if (img && !list.includes(img)) {
//         list.push(img);
//       }
//     }
//   }

//   const finalPrimary = list[0] || '';
//   const finalSecondary = list[1] || '';

//   return {
//     imageUrl: finalPrimary,
//     secondaryImageUrl: finalSecondary,
//     images: list.slice(0, 2),
//   };
// }

// function createProductRouter(requireAdmin) {
//   const router = express.Router();

//   // Public catalog: active products; admin with ?all=true: all products
//   router.get('/', async (req, res, next) => {
//     try {
//       const wantsAll = req.query.all === 'true';

//       if (wantsAll) {
//         return requireAdmin(req, res, async () => {
//           try {
//             const products = await Product.find({}).sort({ createdAt: -1 });
//             res.json({ success: true, products });
//           } catch (error) {
//             next(error);
//           }
//         });
//       }

//       const products = await Product.find({ isActive: true }).sort({
//         createdAt: -1,
//       });
//       res.json({ success: true, products });
//     } catch (error) {
//       next(error);
//     }
//   });

//   // Admin: create product
//   router.post('/', requireAdmin, async (req, res, next) => {
//     try {
//       const {
//         title,
//         category,
//         fabric,
//         gsm,
//         moq,
//         pricePerUnit,
//         isActive,
//       } = req.body || {};

//       if (!title || typeof title !== 'string' || !title.trim()) {
//         return res.status(400).json({
//           success: false,
//           message: 'Product title is required.',
//         });
//       }

//       const parsedMoq = Number(moq);
//       const parsedPrice = Number(pricePerUnit);
//       const imgData = normalizeImagePayload(req.body || {});

//       const product = await Product.create({
//         title: title.trim(),
//         category:
//           typeof category === 'string' && category.trim()
//             ? category.trim()
//             : 'T-Shirts',
//         fabric: typeof fabric === 'string' ? fabric.trim() : '',
//         gsm: typeof gsm === 'string' ? gsm.trim() : '',
//         moq: Number.isFinite(parsedMoq) && parsedMoq >= 1 ? parsedMoq : 50,
//         pricePerUnit:
//           Number.isFinite(parsedPrice) && parsedPrice >= 0 ? parsedPrice : 0,
//         imageUrl: imgData.imageUrl,
//         secondaryImageUrl: imgData.secondaryImageUrl,
//         images: imgData.images,
//         isActive: typeof isActive === 'boolean' ? isActive : true,
//       });

//       res.status(201).json({ success: true, product });
//     } catch (error) {
//       if (error.name === 'ValidationError') {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid product details.',
//         });
//       }
//       next(error);
//     }
//   });

//   // Admin: edit / update product
//   router.patch('/:id', requireAdmin, async (req, res, next) => {
//     try {
//       if (!mongoose.isValidObjectId(req.params.id)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid product ID.',
//         });
//       }

//       const existing = await Product.findById(req.params.id);
//       if (!existing) {
//         return res.status(404).json({
//           success: false,
//           message: 'Product not found.',
//         });
//       }

//       const body = req.body || {};
//       const updates = {};

//       if (Object.hasOwn(body, 'title')) {
//         if (typeof body.title !== 'string' || !body.title.trim()) {
//           return res.status(400).json({
//             success: false,
//             message: 'Product title cannot be empty.',
//           });
//         }
//         updates.title = body.title.trim();
//       }

//       if (Object.hasOwn(body, 'category') && typeof body.category === 'string') {
//         updates.category = body.category.trim();
//       }

//       if (Object.hasOwn(body, 'fabric') && typeof body.fabric === 'string') {
//         updates.fabric = body.fabric.trim();
//       }

//       if (Object.hasOwn(body, 'gsm') && typeof body.gsm === 'string') {
//         updates.gsm = body.gsm.trim();
//       }

//       if (Object.hasOwn(body, 'moq')) {
//         const parsedMoq = Number(body.moq);
//         if (!Number.isFinite(parsedMoq) || parsedMoq < 1) {
//           return res.status(400).json({
//             success: false,
//             message: 'MOQ must be at least 1.',
//           });
//         }
//         updates.moq = parsedMoq;
//       }

//       if (Object.hasOwn(body, 'pricePerUnit')) {
//         const parsedPrice = Number(body.pricePerUnit);
//         if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
//           return res.status(400).json({
//             success: false,
//             message: 'Rate cannot be negative.',
//           });
//         }
//         updates.pricePerUnit = parsedPrice;
//       }

//       if (
//         Object.hasOwn(body, 'imageUrl') ||
//         Object.hasOwn(body, 'secondaryImageUrl') ||
//         Array.isArray(body.images)
//       ) {
//         const imgData = normalizeImagePayload(body, existing);
//         updates.imageUrl = imgData.imageUrl;
//         updates.secondaryImageUrl = imgData.secondaryImageUrl;
//         updates.images = imgData.images;
//       }

//       if (Object.hasOwn(body, 'isActive') && typeof body.isActive === 'boolean') {
//         updates.isActive = body.isActive;
//       }

//       const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         { $set: updates },
//         {
//           new: true,
//           runValidators: true,
//         },
//       );

//       res.json({ success: true, product });
//     } catch (error) {
//       if (error.name === 'ValidationError') {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid update data.',
//         });
//       }
//       next(error);
//     }
//   });

//   // Admin: delete product
//   router.delete('/:id', requireAdmin, async (req, res, next) => {
//     try {
//       if (!mongoose.isValidObjectId(req.params.id)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid product ID.',
//         });
//       }

//       const deleted = await Product.findByIdAndDelete(req.params.id);
//       if (!deleted) {
//         return res.status(404).json({
//           success: false,
//           message: 'Product not found.',
//         });
//       }

//       res.json({ success: true, message: 'Product deleted.' });
//     } catch (error) {
//       next(error);
//     }
//   });

//   return router;
// }

// module.exports = createProductRouter;
const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const ALLOWED_GENDERS = ['Men', 'Women', 'Unisex'];

function normalizeGender(val, fallback = 'Men') {
  if (typeof val !== 'string' || !val.trim()) return fallback;
  const clean = val.trim().toLowerCase();
  if (clean === 'men' || clean === 'male') return 'Men';
  if (clean === 'women' || clean === 'female') return 'Women';
  if (clean === 'unisex') return 'Unisex';
  return fallback;
}

function parseOptionalPositiveNumber(val) {
  if (val === null || val === undefined || val === '') return null;
  const num = Number(val);
  return Number.isFinite(num) && num > 0 ? num : null;
}

function normalizeImagePayload(body = {}, existing = null) {
  const list = [];

  const primaryInput = Object.hasOwn(body, 'imageUrl')
    ? String(body.imageUrl || '').trim()
    : existing?.imageUrl || '';

  const secondaryInput = Object.hasOwn(body, 'secondaryImageUrl')
    ? String(body.secondaryImageUrl || '').trim()
    : existing?.secondaryImageUrl || '';

  if (primaryInput) list.push(primaryInput);
  if (secondaryInput && !list.includes(secondaryInput)) {
    list.push(secondaryInput);
  }

  if (Array.isArray(body.images)) {
    for (const img of body.images) {
      const clean = typeof img === 'string' ? img.trim() : '';
      if (clean && !list.includes(clean)) {
        list.push(clean);
      }
    }
  } else if (
    !Object.hasOwn(body, 'imageUrl') &&
    !Object.hasOwn(body, 'secondaryImageUrl') &&
    Array.isArray(existing?.images)
  ) {
    for (const img of existing.images) {
      if (img && !list.includes(img)) {
        list.push(img);
      }
    }
  }

  const finalPrimary = list[0] || '';
  const finalSecondary = list[1] || '';

  return {
    imageUrl: finalPrimary,
    secondaryImageUrl: finalSecondary,
    images: list.slice(0, 2),
  };
}

function createProductRouter(requireAdmin) {
  const router = express.Router();

  // Public catalog: active products; admin with ?all=true: all products
  router.get('/', async (req, res, next) => {
    try {
      const wantsAll = req.query.all === 'true';

      if (wantsAll) {
        return requireAdmin(req, res, async () => {
          try {
            const products = await Product.find({}).sort({ createdAt: -1 });
            res.json({ success: true, products });
          } catch (error) {
            next(error);
          }
        });
      }

      const products = await Product.find({ isActive: true }).sort({
        createdAt: -1,
      });
      res.json({ success: true, products });
    } catch (error) {
      next(error);
    }
  });

  // Admin: create product
  router.post('/', requireAdmin, async (req, res, next) => {
    try {
      const {
        title,
        gender,
        category,
        fabric,
        gsm,
        moq,
        pricePerUnit,
        isActive,
      } = req.body || {};

      if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Product title is required.',
        });
      }

      const parsedMoq = parseOptionalPositiveNumber(moq);
      const parsedPrice = parseOptionalPositiveNumber(pricePerUnit);
      const imgData = normalizeImagePayload(req.body || {});
      const cleanGender = normalizeGender(gender, 'Men');

      if (!ALLOWED_GENDERS.includes(cleanGender)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid collection/gender selection.',
        });
      }

      const product = await Product.create({
        title: title.trim(),
        gender: cleanGender,
        category:
          typeof category === 'string' && category.trim()
            ? category.trim()
            : 'T-Shirts',
        fabric: typeof fabric === 'string' ? fabric.trim() : '',
        gsm: typeof gsm === 'string' ? gsm.trim() : '',
        moq: parsedMoq,
        pricePerUnit: parsedPrice,
        imageUrl: imgData.imageUrl,
        secondaryImageUrl: imgData.secondaryImageUrl,
        images: imgData.images,
        isActive: typeof isActive === 'boolean' ? isActive : true,
      });

      res.status(201).json({ success: true, product });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid product details.',
        });
      }
      next(error);
    }
  });

  // Admin: edit / update product
  router.patch('/:id', requireAdmin, async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID.',
        });
      }

      const existing = await Product.findById(req.params.id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: 'Product not found.',
        });
      }

      const body = req.body || {};
      const updates = {};

      if (Object.hasOwn(body, 'title')) {
        if (typeof body.title !== 'string' || !body.title.trim()) {
          return res.status(400).json({
            success: false,
            message: 'Product title cannot be empty.',
          });
        }
        updates.title = body.title.trim();
      }

      if (Object.hasOwn(body, 'gender')) {
        updates.gender = normalizeGender(body.gender, existing.gender || 'Men');
      }

      if (Object.hasOwn(body, 'category') && typeof body.category === 'string') {
        updates.category = body.category.trim();
      }

      if (Object.hasOwn(body, 'fabric') && typeof body.fabric === 'string') {
        updates.fabric = body.fabric.trim();
      }

      if (Object.hasOwn(body, 'gsm') && typeof body.gsm === 'string') {
        updates.gsm = body.gsm.trim();
      }

      if (Object.hasOwn(body, 'moq')) {
        updates.moq = parseOptionalPositiveNumber(body.moq);
      }

      if (Object.hasOwn(body, 'pricePerUnit')) {
        updates.pricePerUnit = parseOptionalPositiveNumber(body.pricePerUnit);
      }

      if (
        Object.hasOwn(body, 'imageUrl') ||
        Object.hasOwn(body, 'secondaryImageUrl') ||
        Array.isArray(body.images)
      ) {
        const imgData = normalizeImagePayload(body, existing);
        updates.imageUrl = imgData.imageUrl;
        updates.secondaryImageUrl = imgData.secondaryImageUrl;
        updates.images = imgData.images;
      }

      if (Object.hasOwn(body, 'isActive') && typeof body.isActive === 'boolean') {
        updates.isActive = body.isActive;
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        {
          returnDocument: 'after',
          runValidators: true,
        },
      );

      res.json({ success: true, product });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid update data.',
        });
      }
      next(error);
    }
  });

  // Admin: delete product
  router.delete('/:id', requireAdmin, async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID.',
        });
      }

      const deleted = await Product.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Product not found.',
        });
      }

      res.json({ success: true, message: 'Product deleted.' });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = createProductRouter;