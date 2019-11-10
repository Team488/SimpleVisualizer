import { InfluxDB } from 'influx';
import Api from './Api';
jest.mock('influx');

it('calls influx successfully', () => {
    const api = new Api();
    const result = api.fetchLatestPosition();
});

describe('listSessions', () => {
    it('should return a list of Sessions', async () => {
        const mockQuery = jest.fn();
        mockQuery
            .mockReturnValueOnce(
                [
                    {
                        'Session': 'test-session',
                        'time': '2019-11-09T21:28:16.903Z'
                    }
                ])
            .mockReturnValueOnce(
                [
                    {
                        'Session': 'test-session',
                        'time': '2019-11-09T21:48:16.903Z'
                    }
                ]);
        const mockInflux = {
            query: mockQuery
        }
        const api = new Api(mockInflux as unknown as InfluxDB);
        
        const result = await api.listSessions();
        expect(result).toStrictEqual([{
            name: 'test-session',
            startDateTime: '2019-11-09T21:28:16.903Z',
            endDateTime: '2019-11-09T21:48:16.903Z'
        }]);
    });
});