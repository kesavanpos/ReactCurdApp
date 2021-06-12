import { render, screen } from '@testing-library/react';
import App from './App';

import UserDataService from "./services/user.service";

test('fetch User', async () => {
  await expect(UserDataService.getAll()).resolves.not.toBe('error');
});