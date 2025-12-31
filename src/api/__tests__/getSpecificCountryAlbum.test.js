import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSpecificCountryAlbum } from '../getSpecificCountryAlbum.js';
import { API_ENDPOINTS } from '../config.js';

global.fetch = vi.fn();

describe('getSpecificCountryAlbum', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getSpecificCountryAlbum', () => {
        it('should fetch country album successfully', async () => {
            const countryId = 'canada';
            const mockData = {
                total: 25,
                results: [
                    { 
                        id: '123', 
                        title: 'Mountain View', 
                        url800: 'https://example.com/1.jpg',
                        camera: { fullName: 'Canon EOS R5' }
                    }
                ]
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData
            });

            const result = await getSpecificCountryAlbum(countryId);

            expect(global.fetch).toHaveBeenCalledWith(
                API_ENDPOINTS.ALBUM(countryId),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'x-function-key': 'test-api-key'
                    })
                })
            );
            expect(result).toEqual(mockData);
        });

        it('should construct correct URL for country album', async () => {
            const countryId = 'norway';
            
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ results: [] })
            });

            await getSpecificCountryAlbum(countryId);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`Album/${countryId}`),
                expect.any(Object)
            );
        });

        it('should throw error when response is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Not Found'
            });

            await expect(getSpecificCountryAlbum('invalid')).rejects.toThrow('Network response was not ok: Not Found');
        });

        it('should handle network errors', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            global.fetch.mockRejectedValueOnce(new Error('Timeout'));

            await expect(getSpecificCountryAlbum('canada')).rejects.toThrow('Timeout');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching specific country album:', expect.any(Error));
            
            consoleErrorSpy.mockRestore();
        });
    });
});
