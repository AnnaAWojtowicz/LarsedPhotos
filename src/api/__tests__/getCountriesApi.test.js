import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getCountriesApi } from '../getCountriesApi.js';
import { API_ENDPOINTS } from '../config.js';

global.fetch = vi.fn();

describe('getCountriesApi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getCountriesApi', () => {
        it('should fetch countries successfully', async () => {
            const mockData = {
                page: 1,
                total: 10,
                results: [
                    { id: 'canada', title: 'Canada', photoCount: 50 },
                    { id: 'norway', title: 'Norway', photoCount: 75 }
                ]
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData
            });

            const result = await getCountriesApi();

            expect(global.fetch).toHaveBeenCalledWith(
                API_ENDPOINTS.ALBUMS,
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
                statusText: 'Internal Server Error'
            });

            await expect(getCountriesApi()).rejects.toThrow('Network response was not ok: Internal Server Error');
        });

        it('should handle network errors', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            global.fetch.mockRejectedValueOnce(new Error('Connection failed'));

            await expect(getCountriesApi()).rejects.toThrow('Connection failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching photos:', expect.any(Error));
            
            consoleErrorSpy.mockRestore();
        });
    });
});
