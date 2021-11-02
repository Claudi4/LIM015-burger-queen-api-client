import fetchMock from 'jest-fetch-mock';
import { helpHttp } from '../helpers/helpHttp';
import { signIn, postData } from '../helpers/post';
import { getUserById, getDataById, getData } from '../helpers/get';
import { updateData } from '../helpers/put';
import { deleteDataById } from '../helpers/delete';
import getTime from '../helpers/date';

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

describe('helpHttp', () => {
  it('should return del true', async () => {
    fetch.mockResponseOnce(JSON.stringify({ del: true }));
    const data = await helpHttp().del('url');
    expect(data).toEqual({ del: true });
    expect(fetch).toHaveBeenCalled();
  });
  it('should return get true', async () => {
    fetch.mockResponseOnce(JSON.stringify({ get: true }));
    const data = await helpHttp().get('url');
    expect(data).toEqual({ get: true });
    expect(fetch).toHaveBeenCalled();
  });
  it('should return post true', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post: true }));
    const data = await helpHttp().post('url');
    expect(data).toEqual({ post: true });
    expect(fetch).toHaveBeenCalled();
  });
  it('should return put true', async () => {
    fetch.mockResponseOnce(JSON.stringify({ put: true }));
    const data = await helpHttp().put('url');
    expect(data).toEqual({ put: true });
    expect(fetch).toHaveBeenCalled();
  });
  it('should return error', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'error' }),
      })
    );
    const putData = await helpHttp().put('url');
    expect(putData).toEqual({ ...error, message: 'error' });
    expect(fetch).toHaveBeenCalled();
  });
  it('should return abort', async () => {
    fetch.mockImplementationOnce(() =>
      new Promise((resolve) => setTimeout(() => resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'abort request' }),
      }), 4001))
    );
    const data = await helpHttp().get('url');
    expect(data).toEqual({ ...error, message: 'abort request' });
  });
});

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
    const data = await getUserById(adminUser.email, 'admin123456');
    expect(data).toEqual(adminUser);
    expect(fetch).toHaveBeenCalled();
  });
  it('should return error', async () => {
    fetch.mockReject(() => Promise.reject());
    const data = await getUserById(adminUser.email, 'admin123456');
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
    fetch.mockResponseOnce(JSON.stringify([adminUser]));
    const data = await getData('users');
    expect(data).toEqual([adminUser]);
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
          productId: '123456',
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
          productId: '123456',
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

describe('Get time', () => {
  it('should return disabled time', async () => {
    expect(typeof getTime).toBe('function');
    expect(getTime(new Date(Date.now()), new Date(Date.now()))).toEqual({
      color: 'disable',
      message: '--:--:--',
    });
  });
  it('should return success time', async () => {
    const start = 'Mon Nov 01 2021 14:59:06 GMT-0500 (hora estándar de Perú)';
    const end = 'Mon Nov 01 2021 14:59:25 GMT-0500 (hora estándar de Perú)';
    expect(getTime(end, start)).toEqual({
      color: 'success',
      message: '00:00:19',
    });
  });
  it('should return warning time', async () => {
    const start = 'Mon Nov 01 2021 12:59:06 GMT-0500 (hora estándar de Perú)';
    const end = 'Mon Nov 01 2021 14:59:25 GMT-0500 (hora estándar de Perú)';
    expect(getTime(end, start)).toEqual({
      color: 'warning',
      message: '02:00:19',
    });
  });
  it('should return error time', async () => {
    const start = 'Mon Nov 01 2021 11:59:06 GMT-0500 (hora estándar de Perú)';
    const end = 'Mon Nov 01 2021 14:59:25 GMT-0500 (hora estándar de Perú)';
    expect(getTime(end, start)).toEqual({
      color: 'error',
      message: '03:00:19',
    });
  });
  it('should return run out of time', async () => {
    const start = 'Mon Nov 01 2021 11:59:06 GMT-0500 (hora estándar de Perú)';
    const end = 'Mon Nov 02 2021 14:59:25 GMT-0500 (hora estándar de Perú)';
    expect(getTime(end, start)).toEqual({
      color: 'error',
      message: 'Fuera de tiempo',
    });
  });
});
