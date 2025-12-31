import { describe, it, expect } from 'vitest';
import { API_ENDPOINTS, getApiKey, getAuthHeaders } from '../config.js';

describe('config', () => {
    describe('API_ENDPOINTS', () => {
        it('should have correct ALL_PHOTOS endpoint', () => {
            expect(API_ENDPOINTS.ALL_PHOTOS).toBe(
                'https://fn-flex-flickr-pelsedyr-prod.azurewebsites.net/api/AllPhotos?randomOrder=true'
            );
        });

        it('should have correct ALBUMS endpoint', () => {
            expect(API_ENDPOINTS.ALBUMS).toBe(
                'https://fn-flex-flickr-pelsedyr-prod.azurewebsites.net/api/Albums?randomOrder=false'
            );
        });

        it('should generate correct ALBUM endpoint', () => {
            const countryId = 'canada';
            expect(API_ENDPOINTS.ALBUM(countryId)).toBe(
                `https://fn-flex-flickr-pelsedyr-prod.azurewebsites.net/api/Album/${countryId}?randomOrder=false`
            );
        });

        it('should generate correct SEARCH endpoint', () => {
            const tag = 'wildlife';
            expect(API_ENDPOINTS.SEARCH(tag)).toBe(
                `https://fn-flex-flickr-pelsedyr-prod.azurewebsites.net/api/Search/${tag}?randomOrder=false`
            );
        });

        it('should generate correct EXIF endpoint', () => {
            const imgId = '12345';
            expect(API_ENDPOINTS.EXIF(imgId)).toBe(
                `https://fn-flex-flickr-pelsedyr-prod.azurewebsites.net/api/Exif/${imgId}`
            );
        });
    });

    describe('getApiKey', () => {
        it('should return the API key from environment', () => {
            const apiKey = getApiKey();
            expect(apiKey).toBe('test-api-key');
        });
    });

    describe('getAuthHeaders', () => {
        it('should return headers with x-function-key', () => {
            const headers = getAuthHeaders();
            expect(headers).toEqual({
                'x-function-key': 'test-api-key'
            });
        });
    });
});
