import { Config, JsonDB } from 'node-json-db';

describe('node-json-db (learning)', () => {
  const db = new JsonDB(new Config('test', true, false, '/'));

  describe('write', () => {
    afterAll(async () => {
      await db.delete('/test');
    });

    it('Array test', async () => {
      // given
      await db.push('/test/arr[0]', '안녕하세요');
      await db.push('/test/arr[1]', 'Hello');

      // when
      const result = await db.getData('/test/arr');

      // then
      expect(result).toEqual(['안녕하세요', 'Hello']);
    });

    it('Date가 저장되는지 확인해보자', async () => {
      // given
      const date = new Date();
      await db.push('/test/date', date);

      // when
      const result = await db.getData('/test/date');

      // then
      expect(result).toEqual(date);
    });

    it('다른 프로퍼티 인데 overwrite 옵션 on', async () => {
      // given
      await db.push('/test/overwrite', { message: '안녕하세요' });
      await db.push('/test/overwrite', { message2: 'hello' }, true);

      // when
      const result = await db.getData('/test/overwrite');

      // then
      expect(result).toEqual({ message2: 'hello' });
    });

    it('다른 프로퍼티면 merge', async () => {
      // given
      await db.push('/test/overwrite', { message: '안녕하세요' });
      await db.push('/test/overwrite', { message2: 'hello' }, false);

      // when
      const result = await db.getData('/test/overwrite');

      // then
      expect(result).toEqual({ message: '안녕하세요', message2: 'hello' });
    });

    it('같은 프로퍼티면 overwrite', async () => {
      // given
      await db.push('/test/overwrite', { message: '안녕하세요' });
      await db.push('/test/overwrite', { message: 'hello' }, false);

      // when
      const result = await db.getData('/test/overwrite');

      // then
      expect(result).toEqual({ message: 'hello' });
    });
  });
});
