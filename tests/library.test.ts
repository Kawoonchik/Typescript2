import { expect } from 'chai';
import { Library } from '../src/services/Library';

describe('Library Service', () => {
  let library: Library<{ id: string; name: string }>;

  beforeEach(() => {
    library = new Library<{ id: string; name: string }>();
  });

  it('має додавати новий обєкт', () => {
    library.add({ id: '1', name: 'Item 1' });
    expect(library.getAll().length).to.equal(1);
    expect(library.getAll()[0].name).to.equal('Item 1');
  });

  it('має знаходити обєкт за ID', () => {
    library.add({ id: '1', name: 'Item 1' });
    library.add({ id: '2', name: 'Item 2' });
    
    const found = library.findById('2');
    expect(found).to.not.be.undefined;
    expect(found?.name).to.equal('Item 2');
  });

  it('має видаляти обєкт за ID', () => {
    library.add({ id: '1', name: 'Item 1' });
    library.add({ id: '2', name: 'Item 2' });
    
    library.remove('1');
    expect(library.getAll().length).to.equal(1);
    expect(library.findById('1')).to.be.undefined;
  });
});