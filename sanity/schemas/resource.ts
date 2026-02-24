import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'PDF Guide', value: 'pdf' },
          { title: 'Template', value: 'template' },
          { title: 'Article', value: 'article' },
          { title: 'Video', value: 'video' },
          { title: 'Tool', value: 'tool' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Career Development', value: 'career' },
          { title: 'Entrepreneurship', value: 'entrepreneurship' },
          { title: 'Facilitation', value: 'facilitation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      description: 'Upload PDF, template, or other downloadable file',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Or provide a link to external resource',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on resources page?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      category: 'category',
    },
    prepare(selection) {
      const { title, type, category } = selection
      return {
        title: title,
        subtitle: `${type} - ${category}`,
      }
    },
  },
})
