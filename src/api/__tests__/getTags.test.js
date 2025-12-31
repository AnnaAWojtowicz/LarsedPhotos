import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSpecificTag } from '../getTags.js';
import { API_ENDPOINTS } from '../config.js';

global.fetch = vi.fn();

describe('getTags', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getSpecificTag', () => {
        it('should fetch tag results successfully', async () => {
            const tag = 'wildlife';
            const mockData = {
                total: 15,
                results: [
                    { 
                        id: '456', 
                        title: 'Bear in the wild', 
                        url800: 'https://example.com/bear.jpg',
                        tags: ['wildlife', 'nature', 'bear']
                    },
                    { 
                        id: '789', 
                        title: 'Eagle soaring', 
                        url800: 'https://example.com/eagle.jpg',
                        tags: ['wildlife', 'birds', 'eagle']
                    }
                ]
            };

            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData
            });

            const result = await getSpecificTag(tag);

            expect(global.fetch).toHaveBeenCalledWith(
                API_ENDPOINTS.SEARCH(tag),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'x-function-key': 'test-api-key'
                    })
                })
            );
            expect(result).toEqual(mockData);
        });

        it('should construct correct URL for tag search', async () => {
            const tag = 'sunset';
            
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ results: [] })
            });

            await getSpecificTag(tag);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`Search/${tag}`),
                expect.any(Object)
            );
        });

        it('should throw error when response is not ok', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Bad Request'
            });

            await expect(getSpecificTag('invalid')).rejects.toThrow('Network response was not ok: Bad Request');
        });

        it('should handle network errors', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            global.fetch.mockRejectedValueOnce(new Error('DNS resolution failed'));

            await expect(getSpecificTag('wildlife')).rejects.toThrow('DNS resolution failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching specific img details:', expect.any(Error));
            
            consoleErrorSpy.mockRestore();
        });
    });
});
