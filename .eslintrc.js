module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    // 'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    semi: ['error', 'always'],
    'no-console': 'off',
    'max-lines': [
      'error',
      {
        // 单文件最多350行
        max: 350,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    'max-statements': ['error', 40], // 函数最多行数
    'padded-blocks': 1,
    'vue/no-v-html': 0,
    'no-template-curly-in-string': 0
  },
  overrides: {
    files: [
      'components/project/project-template.vue',
      'components/common/tree-bank/index.vue',
      'components/project/home/header.vue',
      'components/system/batch-role-setting-dialog.vue',
      'pages/project/task-list-query.vue',
      'pages/project/project-setting.vue',
      'pages/project/edit-team.vue',
      'pages/project/bug-list.vue',
      'pages/project/bug-detail.vue',
      'components/system/group-manage/batch-role-setting-dialog.vue',
      'components/document/document-template-dialog.vue',
      'store/test/use-case-list/actions.js',
      'constants/common/bug-list.js',
      'store/test/test-sheet-detail/actions.js',
      'components/common/execute-dialog.vue',
      'components/common/table.vue',
      'pages/project/home.vue',
      'pages/project/test-sheet-list.vue',
      'pages/test/test-sheet-list.vue',
      'store/project/test-sheet-detail/actions.js',
      'components/business/project/home/task-table.vue',
      'components/business/project/task-list-query/task-drawer.vue',
      'components/business/project/test-sheet-detail/kit-table.vue',
      'components/business/system/team-manage/team.vue',
      'components/business/test/test-sheet-detail/kit-table.vue',
      'components/business/test/kit-detail/kit-table.vue',
      'components/business/common/bug-list/edit-bug-form.vue',
      'components/business/common/tree-bank/index.vue',
      'components/business/common/use-case/drag-table.vue',
      'components/business/common/document-list.vue'
    ],
    rules: {
      'max-lines': 'off'
    },
  }
};
