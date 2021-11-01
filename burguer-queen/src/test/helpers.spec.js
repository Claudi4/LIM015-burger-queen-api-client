import fetchMock from 'jest-fetch-mock';
import { signIn, postData } from '../helpers/post';
import { getUserById, getDataById, getData } from '../helpers/get';
import { updateData } from '../helpers/put';
import { deleteDataById } from '../helpers/delete';

fetchMock.enableMocks();
beforeEach(() => {
  sessionStorage.setItem('user', JSON.stringify({ token: '123456' }));
  fetch.resetMocks();
});

const error = {
  err: true,
  message: "Cannot read property 'message' of undefined",
  status: '500',
  statusText: 'Ocurrió un error',
};

const adminUser = {
  _id: '123456',
  email: 'admin@gmail.com',
  roles: {
    rol: 'admin',
    admin: true,
  },
};

const productResponse = {
  _id: '123456',
  name: 'Cafe',
  price: 9,
  type: 'Desayuno',
  image: 'imagen',
};

describe('Sign In', () => {
  it('should return token', async () => {
    fetch.mockResponseOnce(JSON.stringify({ token: 'admin123456' }));
    const data = await signIn({
      email: adminUser.email,
      password: 'Admin#123456',
    });
    expect(data).toEqual({ token: 'admin123456' });
    expect(fetch).toHaveBeenCalled();
  });
  it('should return error', async () => {
    fetch.mockReject(() => Promise.reject());
    const data = await signIn({
      email: adminUser.email,
      password: 'Admin#123456',
    });
    expect(data).toEqual(error);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Get User By Id', () => {
  it('should return user', async () => {
    fetch.mockResponseOnce(JSON.stringify(adminUser));
    const data = await getUserById(adminUser.email,'admin123456');
    expect(data).toEqual(adminUser);
    expect(fetch).toHaveBeenCalled();
  });
  it('should return error', async () => {
    fetch.mockReject(() => Promise.reject());
    const data = await getUserById(adminUser.email,'admin123456');
    expect(data).toEqual(error);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Get Data By Id', () => {
  it('should return user', async () => {
    fetch.mockResponseOnce(JSON.stringify(adminUser));
    const data = await getDataById('users', adminUser._id);
    expect(data).toEqual(adminUser);
    expect(fetch).toHaveBeenCalled();
  });
  it('should return error', async () => {
    fetch.mockReject(() => Promise.reject());
    const data = await getDataById('users', adminUser._id);
    expect(data).toEqual(error);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Get Data', () => {
  it('should return users', async () => {
    fetch.mockResponseOnce(JSON.stringify([ adminUser ]));
    const data = await getData('users');
    expect(data).toEqual([ adminUser ]);
    expect(fetch).toHaveBeenCalled();
  });
  it('should return error', async () => {
    fetch.mockReject(() => Promise.reject());
    const data = await getData('users');
    expect(data).toEqual(error);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Post Data', () => {
  it('should return new order', async () => {
    const newOrder = {
      _id: '123456',
      userId: 'chef123456',
      client: 'varios',
      status: 'pendiente',
      dateEntry: Date.now(),
      dateProcessed: Date.now(),
      products: [
        {
          qty: 5,
          product: {
            ...productResponse,
          },
        },
      ],
    };
    fetch.mockResponseOnce(JSON.stringify(newOrder));
    const data = await postData('orders', {
      userId: 'chef123456',
      client: 'varios',
      products: [
        {
          qty: 5,
          productId:'123456'
        },
      ],
    });
    expect(data).toEqual(newOrder);
    expect(fetch).toHaveBeenCalled();
  });
  it('should return error', async () => {
    fetch.mockReject(() => Promise.reject());
    const data = await postData('orders', {
      userId: 'chef123456',
      client: 'varios',
      products: [
        {
          qty: 5,
          productId:'123456'
        },
      ],
    });
    expect(data).toEqual(error);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Update Data', () => {
  it('should return updated product', async () => {
    fetch.mockResponseOnce(JSON.stringify(productResponse));
    const productToEdit = {
      name: 'Cafe',
      price: 9,
    };
    const data = await updateData('products', '123456', productToEdit);
    expect(data).toEqual(productResponse);
    expect(fetch).toHaveBeenCalled();
  });
  it('should return error', async () => {
    fetch.mockReject(() => Promise.reject());
    const data = await updateData('products', '1234', {});
    expect(data).toEqual(error);
    expect(fetch).toHaveBeenCalled();
  });
});

describe('Delete Data By Id', () => {
  it('should return deleted product', async () => {
    fetch.mockResponseOnce(JSON.stringify(productResponse));
    const data = await deleteDataById('products', '123456');
    expect(data).toEqual(productResponse);
    expect(fetch).toHaveBeenCalled();
  });
  it('should return error', async () => {
    fetch.mockReject(() => Promise.reject());
    const data = await deleteDataById('products', '1234', {});
    expect(data).toEqual(error);
    expect(fetch).toHaveBeenCalled();
  });
});
