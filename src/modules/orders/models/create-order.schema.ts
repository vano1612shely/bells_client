import { z } from 'zod'

export const relayPointSchema = z.object({
  id: z.number().optional(),
  Num: z.string(),
  LgAdr1: z.string(),
  LgAdr2: z.string().optional().nullable(),
  LgAdr3: z.string().optional().nullable(),
  LgAdr4: z.string().optional().nullable(),
  CP: z.string(),
  Ville: z.string(),
  Pays: z.string(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  cp: z.number().optional(),
  city: z.string().optional(),
})

export const photoSchema = z
  .object({
    originImage: z.instanceof(File).optional().nullable(),
    image: z.instanceof(File).nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.originImage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [], // важливо: не ['originImage'], а [] -> тоді помилка піде в photo
        message: 'Photo originale requise',
      })
    }
  })

export const backPhotoSchema = z.object({
  originImage: z.instanceof(File).nullable().optional(),
  image: z.instanceof(File).nullable().optional(),
})

export const orderItemSchema = z.object({
  quantity: z.number().min(1),
  characteristics: z.record(z.string(), z.string()).default({}).optional(),
  photo: photoSchema,
  backTemplateId: z.string().nullable().optional(),
  backPhoto: backPhotoSchema.optional(),
})

export const deliveryAddressSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  street: z.string().min(1, 'Adresse requise'),
  additional: z.string().optional(),
  postalCode: z.string().min(4, 'Code postal invalide'),
  city: z.string().min(1, 'Ville requise'),
  phone: z.string().min(6, 'Téléphone requis'),
})

export const relayDeliverySchema = z.object({
  phone: z.string().min(6, 'Téléphone requis'),
  point: relayPointSchema.nullable().optional(),
})

export const deliverySchema = z
  .object({
    type: z.enum(['home', 'relay']),
    address: deliveryAddressSchema.optional(),
    relay: relayDeliverySchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'home') {
      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['address'],
          message: 'Adresse requise pour la livraison à domicile',
        })
      }
    }

    if (data.type === 'relay') {
      if (!data.relay?.point) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['relay', 'point'],
          message: 'Point relais requis',
        })
      }
    }
  })

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'Ajoutez au moins un produit'),
  name: z.string(),
  email: z.string(),
  delivery: deliverySchema,
})

export type OrderSchema = z.infer<typeof orderSchema>
export type RelayPoint = z.infer<typeof relayPointSchema>
