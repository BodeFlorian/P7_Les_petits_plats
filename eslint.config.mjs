import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc/lib/shared/flat-compat';
import { ConfigArrayFactory } from '@eslint/eslintrc/lib/shared/config-array-factory';
import pluginJs from '@eslint/eslintrc/lib/configs/javascript';

// Import de Prettier
import prettierConfig from 'eslint-config-prettier';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configArrayFactory = new ConfigArrayFactory({ baseDirectory: __dirname });
const compat = new FlatCompat({ configArrayFactory });

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('airbnb-base'),
  // Ajout de Prettier à la configuration
  prettierConfig
];
