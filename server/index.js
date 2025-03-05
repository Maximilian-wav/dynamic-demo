import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const DYNAMIC_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAr0tCkZCEOoMYGtB3moj9
aiB3evbdnvaYB0JLhTY3+tX08vaJvw3SvVQbfTpygMo/xYovxrYGWi7LldYXyw/c
DyRF1uVndLjUFWxMBYNN+/E6tLyGcCt2tRyjn1t99BlLhh+Qs1o6HOuOUTGwNVcR
S10SAmncSOEtuunponZ7URuVN67dtGlL2oIoO3fhNsmgAue3xB5Kyz2KRBHehsVv
ZVzSM8OHz1OGacUolWmLKnZ+ve1es+3NDGL9PQ8zO2O9t1Zj3MiQuUBHc0ddHpLQ
oRnvt7X1zdTcFtX+boAvJ6Qa/2letTlX3nf+gxXRbPgz8cUcsv1YG48ltlMwhHoZ
7u8x1viWyj8NKelVwIwI533YgfdFKUN6r6Q7OSuq7lYfUbLkPbgXvkCXaXGjbRGQ
3x4T8l5kG3E6ZDa140n1JzRdBBNRRq8b7tBHalL/LSoplkrB0SWbBtvGbE1/10V9
O57xW7D98YmhSDRvdfPGgmSvd6ntDlDKzIhprL6PI9QhoKRW64EuKi2zv7Ce0XXb
M5EjZTTZhuovU3X5/VarAWxogpRK34U1TSB2qfTg2S++JqqJi63HpLYjd3OvekC9
b1aqAXCVosNlVwABOV/H3tdvZ7DUm5Yemd1eCkFV8iFJTFERK0jAWJv57v43AoSe
JQLot3HA4ZLRd/25+WCRYZMCAwEAAQ==
-----END PUBLIC KEY-----`;

app.post('/api/auth', (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(401).send('No token provided');

  try {
    const decoded = jwt.verify(token, DYNAMIC_PUBLIC_KEY, { algorithms: ['RS256'] });
    console.log('✅ Token verified:', decoded);
    res.status(200).send('User authenticated');
  } catch (error) {
    console.error('❌ Invalid token:', error);
    res.status(401).send('Invalid token');
  }
});

app.listen(5000, () => {
  console.log('✅ Backend running on http://localhost:5000');
});
