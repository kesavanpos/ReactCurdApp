import { render, screen } from '@testing-library/react';


import UserDataService from "./services/user.service";

test('fetch Users should not contain error', async () => {
  await expect(UserDataService.getAll()).resolves.not.toBe('error');
});

test('check whether users is not an empty array', async () => {        
  await expect(UserDataService.getAll()).not.toBe([]);
});