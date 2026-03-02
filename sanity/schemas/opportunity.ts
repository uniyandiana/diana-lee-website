import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'opportunity',
  title: 'Opportunities',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Rich text description for the opportunity (keep it concise for card display)',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
      description: 'Link to the opportunity website or application page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Event', value: 'event' },
          { title: 'Competition', value: 'competition' },
          { title: 'Grant', value: 'grant' },
          { title: 'Resource', value: 'resource' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Programme', value: 'programme' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: '🇭🇰 Hong Kong', value: 'hk' },
          { title: '🇬🇧 UK', value: 'uk' },
          { title: '🌍 International', value: 'international' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Students', value: 'students' },
          { title: 'Professionals', value: 'professionals' },
          { title: 'Entrepreneurs', value: 'entrepreneurs' },
          { title: 'Tech', value: 'tech' },
          { title: 'Social Impact', value: 'social-impact' },
          { title: 'Creative Industries', value: 'creative' },
          { title: 'Youth', value: 'youth' },
          { title: 'Women', value: 'women' },
        ],
      },
      description: 'Select all relevant tags for this opportunity',
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline / Event Date',
      type: 'datetime',
      description: 'Application deadline for grants/competitions, or event date for events/workshops',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateLabel',
      title: 'Date Label',
      type: 'string',
      options: {
        list: [
          { title: 'Deadline', value: 'deadline' },
          { title: 'Event Date', value: 'event' },
        ],
        layout: 'radio',
      },
      initialValue: 'deadline',
      description: 'Choose whether to display "Deadline" or "Event Date" on the opportunity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: '繁體中文', value: 'zh' },
          { title: 'Both', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this opportunity?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      region: 'region',
      deadline: 'deadline',
      language: 'language',
    },
    prepare(selection) {
      const { title, type, region, deadline, language } = selection
      const regionEmoji = region === 'hk' ? '🇭🇰' : region === 'uk' ? '🇬🇧' : '🌍'
      const langLabel = language === 'zh' ? ' (中文)' : language === 'en' ? ' (EN)' : ' (Both)'
      const deadlineStr = deadline ? new Date(deadline).toLocaleDateString() : 'No deadline'

      return {
        title: `${regionEmoji} ${title}`,
        subtitle: `${type}${langLabel} - ${deadlineStr}`,
      }
    },
  },
  orderings: [
    {
      title: 'Deadline (Soonest First)',
      name: 'deadlineAsc',
      by: [{ field: 'deadline', direction: 'asc' }],
    },
    {
      title: 'Recently Added',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})
