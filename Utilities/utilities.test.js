import { offsetToTime } from './utilities';

describe('Time formatter', ()=>{
    it('Should convert timezone offset to local time', ()=>{
        const offset = 36000;
        const d = new Date();
        const h = d.getHours();
        const m = d.getMinutes()<10?`0${d.getMinutes()}`:d.getMinutes();
        const localTime = `${h}:${m}`;
        expect(offsetToTime(offset)).toBe(localTime);
    });
});