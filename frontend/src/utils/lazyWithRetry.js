import React from 'react';

const RETRY_KEY = 'asr-lazy-retry';

const shouldReload = () => {
  try {
    return sessionStorage.getItem(RETRY_KEY) !== '1';
  } catch {
    return true;
  }
};

const markReloaded = () => {
  try {
    sessionStorage.setItem(RETRY_KEY, '1');
  } catch {
    // no-op
  }
};

const clearReloadMark = () => {
  try {
    sessionStorage.removeItem(RETRY_KEY);
  } catch {
    // no-op
  }
};

export const lazyWithRetry = (factory) =>
  React.lazy(async () => {
    try {
      const module = await factory();
      clearReloadMark();
      return module;
    } catch (error) {
      const message = String(error?.message || '').toLowerCase();
      const isChunkError =
        message.includes('loading chunk') ||
        message.includes('chunkloaderror') ||
        message.includes('failed to fetch dynamically imported module');

      if (isChunkError && shouldReload()) {
        markReloaded();
        window.location.reload();
      }

      throw error;
    }
  });
