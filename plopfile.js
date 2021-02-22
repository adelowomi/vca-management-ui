module.exports = (plop) => {
  plop.setGenerator('documentation', {
    description: 'Create documentation',
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your document name?',
      },
      {
        type: 'input',
        name: 'content',
        message: 'provide markdown content for your document',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'documentation/{{camelCase name}}.stories.mdx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/storybook/documentation.stories.mdx.hbs',
        skipIfExists: false,
      },
    ],
  });

  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'What does your component do?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/components/Component.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop-templates/components/Component.stories.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/{{pascalCase name}}.spec.ts',
        templateFile: 'plop-templates/components/Component.spec.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/components/index.ts.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'components/index.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: "import {{pascalCase name}} from './{{pascalCase name}}';",
      },
    ],
  });

  plop.setGenerator('hook', {
    description: 'Create a custom react hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your hook name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'hooks/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'plop-templates/hooks/hook.ts.hbs',
      },
      {
        type: 'add',
        path: 'hooks/{{camelCase name}}/{{camelCase name}}.spec.ts',
        templateFile: 'plop-templates/hooks/hook.spec.ts.hbs',
      },
      {
        type: 'add',
        path: 'hooks/{{camelCase name}}/index.ts',
        templateFile: 'plop-templates/hooks/index.ts.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'hooks/index.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template: "import {{camelCase name}} from './{{camelCase name}}';",
      },
    ],
  });

  plop.setGenerator('pages', {
    description: 'Create a custom page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'pages/{{camelCase name}}/{{camelCase name}}.tsx',
        templateFile: 'plop-templates/pages/page.tsx.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'pages/{{camelCase name}}/{{camelCase name}}.spec.ts',
        templateFile: 'plop-templates/pages/page.spec.ts.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: 'pages/{{camelCase name}}/index.ts',
        templateFile: 'plop-templates/pages/index.ts.hbs',
        skipIfExists: true,
      },
    ],
  });
};
