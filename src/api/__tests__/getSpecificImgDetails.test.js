import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSpecificImgDetails } from '../getSpecificImgDetails.js';
import { API_ENDPOINTS } from '../config.js';

global.fetch = vi.fn();

describe('getSpecificImgDetails', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getSpecificImgDetails', () => {
        it('should fetch image details successfully', async () => {
            const imgId = '52355949794';
            const mockData = {
                results: [
                    {
                        id: '52355949794',
                        camera: { fullName: 'Canon EOS R5' },
                        lens: { lensModel: 'RF 24-70mm f/2.8L IS USM' },
                        exposure: {
                            iso: '400',
                            aperture: 'f/4.0',
                            exposureTime: '1/250'
                        },
                        location: {
                            latitude: '53.5461',
                            longitude: '-113.4938',
                            country: 'Canada',
                            region: 'Alberta'
                        },
                        tags: ['cityscape', 'bridge', 'night']
                    }
                ]
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData
            });

            const result = await getSpecificImgDetails(imgId);

            expect(global.fetch).toHaveBeenCalledWith(
                API_ENDPOINTS.EXIF(imgId),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'x-function-key': 'test-api-key'
                    })
                })
            );
            expect(result).toEqual(mockData);
        });

        it('should construct correct URL for exif data', async () => {
            const imgId = '12345';
            
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ results: [] })
            });

            await getSpecificImgDetails(imgId);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`Exif/${imgId}`),
                expect.any(Object)
            );
        });

        it('should throw error when response is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Forbidden'
            });

            await expect(getSpecificImgDetails('12345')).rejects.toThrow('Network response was not ok: Forbidden');
        });

        it('should handle network errors', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            global.fetch.mockRejectedValueOnce(new Error('Request timeout'));

            await expect(getSpecificImgDetails('12345')).rejects.toThrow('Request timeout');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching specific img details:', expect.any(Error));
            
            consoleErrorSpy.mockRestore();
        });
    });
});
