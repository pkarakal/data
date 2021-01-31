import { DataPermissionEventListener } from '../data-permission';

describe('DataPermissionEventListener', () => {
    it('should create instance', () => {
        const permissionListener = new DataPermissionEventListener();
        expect(permissionListener).toBeTruthy();
    });
});