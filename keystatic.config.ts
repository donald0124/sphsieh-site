// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  // ... 其他設定保持不變
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        pubDate: fields.date({ label: 'Published Date' }),
        description: fields.text({ label: 'Description' }),
        
        // 1. 新增：標籤系統 (Tags)
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value, // 讓後台列表直接顯示標籤名
            description: '例如: Ortho, React, Life, Reading' 
          }
        ),

        // 2. 調整：視覺主題 (Theme Mode) - 取代原本的嚴格 Category
        themeMode: fields.select({
          label: 'Theme Mode',
          description: '這篇文章適合什麼氛圍？(影響閱讀器的配色)',
          options: [
            { label: 'Medical (Day / Blue)', value: 'medical' },
            { label: 'Tech (Night / Green)', value: 'tech' },
            { label: 'Neutral (Default)', value: 'neutral' },
          ],
          defaultValue: 'neutral',
        }),

        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/assets/images/posts',
            publicPath: '../../assets/images/posts/',
          },
        }),
      },
    }),
    // ... Projects collection 也可以加入類似的 tags
  },
});