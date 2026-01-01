import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getPhotos } from '../homeApi.js';
import { API_ENDPOINTS } from '../config.js';

global.fetch = vi.fn();

describe('homeApi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getPhotos', () => {
        it('should fetch photos successfully', async () => {
            const mockData = {
                page: 1,
                total: 240,
                results: [
                    { id: '1', title: 'Photo 1', url800: 'https://example.com/1.jpg' },
                    { id: '2', title: 'Photo 2', url800: 'https://example.com/2.jpg' }
                ]
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData
            });

            const result = await getPhotos();

            expect(global.fetch).toHaveBeenCalledWith(
                API_ENDPOINTS.ALL_PHOTOS,
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'x-function-key': 'test-api-key'
                    })
                })
            );
            expect(result).toEqual(mockData);
        });

        it('should throw error when response is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Not Found'
            });

            await expect(getPhotos()).rejects.toThrow('Network response was not ok: Not Found');
        });

        it('should handle network errors', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            global.fetch.mockRejectedValueOnce(new Error('Network error'));

            await expect(getPhotos()).rejects.toThrow('Network error');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching photos:', expect.any(Error));
            
            consoleErrorSpy.mockRestore();
        });
    });
});
