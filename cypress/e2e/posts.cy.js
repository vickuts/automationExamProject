import { faker } from '@faker-js/faker';
import post from '../fixtures/post.json';
import user from '../fixtures/user.json';

post.userId = parseInt(faker.random.numeric());
post.title = faker.lorem.word();
post.body = faker.lorem.words();

user.email = faker.internet.email();
user.password = faker.internet.password();

let randomId = parseInt(faker.random.numeric(10));

it('1. Get all posts', () => {
  cy.log('**Verify HTTP response status code and content type**');
  cy.request('GET', '/posts').then(response => {
    expect(response.status).to.be.eq(200);
    expect(response.headers['content-type']).to.be.eq('application/json; charset=utf-8');
  })
})

it('2. Get only first 10 posts', () => {
  cy.log('**Verify HTTP response status code. Verify that only first posts are returned**');
  cy.request('GET', '/posts?_start=0&_end=10').then(response => {
    expect(response.status).to.be.eq(200);
    expect(response.body[0].id).to.be.eq(1);
    expect(response.body[9].id).to.be.eq(10);
  })
})

it('3. Get posts with id = 55 and id = 60', () => {
  cy.log('**Verify HTTP response status code. Verify id values of returned records**');
  cy.request('GET', '/posts?id=55&id=60').then(response => {
    expect(response.status).to.be.eq(200);
    expect(response.body[0].id).to.be.eq(55);
    expect(response.body[1].id).to.be.eq(60);
  })
})

it('4. Create a post', () => {
  cy.log('**Verify HTTP response status code**');
  cy.request({
    method: 'POST',
    url: '/664/posts',
    body: post,
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.be.eq(401);
  })
})

it('5. Create post with adding access token in header', () => {
  cy.log('**Verify HTTP response status code. Verify post is created**');

  let token;

  cy.request({
    method: 'POST',
    url: '/register',
    body: user
  }).then(response => {
    expect(response.status).to.be.eq(201);
    token = 'Bearer ' + response.body.accessToken;
  }).then(() => {
    cy.request({
      method: 'POST',
      url: '/664/posts',
      headers: {
        'Authorization': token
      },
      body: post
    }).then(response => {
      expect(response.status).to.be.eq(201);
      expect(response.body.title).to.be.eq(post.title);
      expect(response.body.body).to.be.eq(post.body);
    })
  })
})

it('6. Create post entity and verify that the entity is created', () => {
  cy.log('**Verify HTTP response status code. Use JSON in body**');
  cy.request('POST', '/posts', post).then(response => {
    expect(response.status).to.be.eq(201);
    expect(response.body.userId).to.be.eq(post.userId);
    expect(response.body.title).to.be.eq(post.title);
    expect(response.body.body).to.be.eq(post.body);
  })
})

it('7. Update non-existing entity', () => {
  cy.log('**Verify HTTP response status code**');

  post.title = 'UpdatedPostTitle';
  post.body = 'updated post body';

  cy.request({
    method: 'PUT',
    url: `/posts/${randomId}`,
    body: post,
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.be.eq(404);
  })
})

it('8. Create post entity and update the created entity', () => {
  cy.log('**Verify HTTP response status code and verify that the entity is updated**');

  const updatedTitle = 'UpdatedPostTitle';
  const updatedBody = 'updated post body';

  let postId;

  cy.request({
    method: 'POST',
    url: '/posts',
    body: post
  }).then(response => {
    postId = response.body.id;
    expect(response.status).to.be.eq(201);
    expect(response.body.title).to.be.eq(post.title);
    expect(response.body.body).to.be.eq(post.body);
  }).then(() => {
    cy.request({
      method: 'PUT',
      url: `/posts/${postId}`,
      body:
      {
        title: updatedTitle,
        body: updatedBody
      }
    }).then(response => {
      expect(response.status).to.be.eq(200);
      expect(response.body.title).to.be.eq(updatedTitle);
      expect(response.body.body).to.be.eq(updatedBody);
    })
  })
})

it('9. Delete non-existing post entity', () => {
  cy.log('**Verify HTTP response status code**');
  cy.request({
    method: 'DELETE',
    url: `/posts/${randomId}`,
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.be.eq(404);
  })
})

it('10. Create post entity, update the created entity, and delete the entity', () => {
  cy.log('**Verify HTTP response status code and verify that the entity is deleted**');

  const updatedTitle = 'UpdatedPostTitle';
  const updatedBody = 'updated post body';

  let postId;

  cy.request({
    method: 'POST',
    url: '/posts',
    body: post
  }).then(response => {
    postId = response.body.id;
    expect(response.status).to.be.eq(201);
    expect(response.body.title).to.be.eq(post.title);
    expect(response.body.body).to.be.eq(post.body);
  }).then(() => {
    cy.request({
      method: 'PUT',
      url: `/posts/${postId}`,
      body:
      {
        title: updatedTitle,
        body: updatedBody
      }
    }).then(response => {
      expect(response.status).to.be.eq(200);
      expect(response.body.title).to.be.eq(updatedTitle);
      expect(response.body.body).to.be.eq(updatedBody);
    }).then(() => {
      cy.request('DELETE', `/posts/${postId}`).then(response => {
        expect(response.status).to.be.eq(200);
      }).then(() => {
        cy.request({
          method: 'GET',
          url: `/posts/${postId}`,
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.be.eq(404);
        })
      })
    })
  })
})