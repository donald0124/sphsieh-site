import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        posts: collection({
            label: 'Blog Posts',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                publishedDate: fields.date({ label: 'Published Date' }),
                category: fields.select({
                    label: 'Category',
                    options: [
                        { label: 'Medical', value: 'medical' },
                        { label: 'Technology', value: 'tech' },
                        { label: 'Life', value: 'life' }
                    ],
                    defaultValue: 'tech'
                }),
                description: fields.text({ label: 'Description', multiline: true }),
                content: fields.markdoc({
                    label: 'Content',
                    options: {
                        image: {
                            directory: 'src/assets/images/posts',
                            publicPath: '@assets/images/posts/',
                        },
                    },
                }),
            },
        }),
        projects: collection({
            label: 'Projects',
            slugField: 'title',
            path: 'src/content/projects/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Project Name' } }),
                sortOrder: fields.number({ label: 'Sort Order', validation: { min: 0 } }),
                category: fields.text({ label: 'Category (e.g. AI, Web)' }),
                image: fields.image({
                    label: 'Cover Image',
                    directory: 'public/images/projects',
                    publicPath: '/images/projects/'
                }),
                demoLink: fields.url({ label: 'Demo URL' }),
                repoLink: fields.url({ label: 'GitHub URL' }),
                description: fields.text({ label: 'Short Description', multiline: true }),
                content: fields.markdoc({ label: 'Detailed Content' }),
            },
        }),
    },
});
