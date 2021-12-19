import { TestApplication } from './TestApplication';
import { DataContext, DataObjectAssociationError } from '../index';
import { resolve } from 'path';
import { TestUtils } from './adapter/TestUtils';

describe('DataQueryable', () => {
    let app: TestApplication;
    let context: DataContext;
    beforeAll((done) => {
        app = new TestApplication(resolve(__dirname, 'test2'));
        // set default adapter
        const adapters: Array<any> = app.getConfiguration().getSourceAt('adapters');
        adapters.unshift({
            name: 'test-local',
            invariantName: 'test',
            default: true,
            options: {
                database: resolve(__dirname, 'test2/db/local.db')
            }
        });
        context = app.createContext();
        return done();
    });
    afterAll((done) => {
        if (context) {
            return context.finalize(() => {
                return done();
            });
        }
        return done();
    });
    it('should parse filter', async () => {
        const query = await context.model('Order').filterAsync({
            $filter: `orderedItem/name eq 'Samsung Galaxy S4'`
        });
        const items = await query.silent().getItems();
        expect(items.length).toBeGreaterThan(0);
        items.forEach((item: { orderedItem: { name: string } }) => {
            expect(item.orderedItem.name).toBe('Samsung Galaxy S4');
        });
    });
    it('should parse select', async () => {
        const query = await context.model('Order').filterAsync({
            $select: `id,orderedItem/name as orderedItemName,year(orderedItem/releaseDate) as releaseYear`,
            $orderby: 'orderedItem/price desc',
            $filter: `orderedItem/name eq 'Samsung Galaxy S4'`
        });
        const items = await query.silent().getItems();
        expect(items.length).toBeGreaterThan(0);
        items.forEach((item: { 
            id: number,
            orderedItemName: string,
            releaseYear?: number
         }) => {
            expect(item.orderedItemName).toBe('Samsung Galaxy S4');
            expect(item.releaseYear).toBeTruthy();
            const keys = Object.keys(item);
            expect(keys.length).toBe(3);
        });
    });
});