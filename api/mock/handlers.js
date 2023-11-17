// import { rest } from 'msw';

// const users = [
//     {
//         id: 'test',
//         password: 'test1234',
//         phoneNum: '01012345678'
//     }
// ]

// export const handlers = [

//     rest.get('/people', async (req, res, ctx) =>{
//         console.log('/people')
//         return res(ctx.status(200), cts.json(users[0]))
//     }),

//     rest.get('/api/people', async (req, res, ctx) =>{
//         console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
//         return res(ctx.status(200), cts.json(users[0]))
//     }),

//     rest.post('/signUp', (req, res, ctx) => {
//         return res(ctx.status(205));
//     }),

//     rest.post('/signUp', (req, res, ctx) => {
//         users.push(req.body);
//         return res(ctx.status(201));
//     })
// ]