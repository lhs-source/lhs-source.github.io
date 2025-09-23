import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        subject: z.string(),
        volume: z.string(),
        tags: z.array(z.string()),
        created: z.string(),
        updated: z.string(),
        filename: z.string(),
      })
    })
  }
})
