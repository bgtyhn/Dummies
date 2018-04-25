const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const request = require('request-promise');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const spauth = require('node-sp-auth')

//process.env["NO_PROXY"] = "*"; desactivar solo datapower

app.get('/', function (req, res) {
  res.send('Hello World! ');
});
app.post('/GeneracionToken/solicitarToken', function (req, res) {
  console.log('solicitar Token');
  let resp = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ "respuesta": true })
    }, 1000)
  });
  resp.then(resp => res.json(resp))
    .catch(err => res.json(err));
});

app.post('/GeneracionToken/validarToken', function (req, res) {
  console.log('validarToken');
  let resp = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ "rpta": true })
    }, 1000)
  });
  resp.then(resp => res.json(resp))
    .catch(err => res.json(err));
});

app.post('/ConsultaProductoTarjetas/consultarProductoTarjetasFisicas', function (req, res) {
  let resp = new Promise(function (resolve, reject) {
    console.log('message');
    setTimeout(() => {
      resolve({
        "informacionTarjeta": {
          "informacionCliente": {
            "nombreTitular": "Jessica290 Marie289",
            "apellidoTitular": "Alba287 Jensen288"
          },
          "informacionBasicaTarjeta": [{
            "numeroTarjeta": "0000377814027305035",
            "franquicia": "AMEX",
            "fechaVencimiento": "2022-02-28",
            "estado": "0000",
            "descripcionEstado": "TARJETA ACTIVA",
            "fechaApertura": "2016-09-16",
            "relacion": "T"
          },
          {
            "numeroTarjeta": "0000377814172266677",
            "franquicia": "AMEX",
            "fechaVencimiento": "2022-01-31",
            "estado": "0000",
            "descripcionEstado": "TARJETA ACTIVA",
            "fechaApertura": "2016-08-11",
            "relacion": "T"
          },
          {
            "numeroTarjeta": "0004110540002952921",
            "franquicia": "V",
            "fechaVencimiento": "2022-09-30",
            "estado": "0000",
            "descripcionEstado": "TARJETA ACTIVA",
            "fechaApertura": "2016-09-16",
            "relacion": "T"
          },
          {
            "numeroTarjeta": "0004110540002268495",
            "franquicia": "M",
            "fechaVencimiento": "2021-06-26",
            "estado": "0000",
            "descripcionEstado": "TARJETA ACTIVA",
            "fechaApertura": "2016-06-18",
            "relacion": "T"
          },
          {
            "numeroTarjeta": "0004110540437743762",
            "franquicia": "V",
            "fechaVencimiento": "2022-09-30",
            "estado": "0000",
            "descripcionEstado": "TARJETA ACTIVA",
            "fechaApertura": "2016-09-16",
            "relacion": "T"
          }
          ]
        }
      })
    }, 1000)

  });
  resp.then(resp => res.json(resp))
    .catch(err => res.json(err));
});

app.post('/ConsultaInformacionTarjetaCredito/consultarInformacionDetallada', function (req, res) {
  let resp = new Promise(function (resolve, reject) {

    setTimeout(() => {
      resolve({
        "informacionDetalladaTarjeta": {
          "tipoDocumento": "CC",
          "numeroDocumento": "0000404195451",
          "numeroTarjeta": "5303730393507426",
          "fechaPago": "171018",
          "fechaVencimiento": "2503",
          "valorPagoMinimoPesos": "208125.00",
          "valorDeudaPesos": "1152569.00",
          "valorPagoMinimoDolares": "61.00",
          "valorDeudaDolares": "519.00",
          "saldoTotalDisponible": "923680.00",
          "saldoDisponibleAvances": "923680.00",
          "valorPagoTotalPesos": "1152569.00",
          "valorPagoTotalDolares": "519.00",
          "valorSobrecupo": "0.00",
          "valorCupoTotal": "3000000.00",
          "estadoTarjeta": "Activa"
        }
      })
    }, 2000)

  });
  resp.then(resp => res.json(resp))
    .catch(err => res.json(err));
});


app.post('/sp', (req, res) => {
  const spurl = req.body.endpoint;
  const credentialsOptions = {
    username : 'jupcasta',
    password: 'GamixGuitar1234!.',
    domain: 'bancolombia',
  };
  spauth.getAuth('http://ycomolohago.bancolombia.corp/', credentialsOptions)
    .then(data => {
      console.log(data);
      const headers = data.headers;
      headers.Accept = 'application/json;odata=verbose';
      const requestOpts = data.options;
      requestOpts.json = true;
      requestOpts.headers = headers;
      const folderName = '/Shared Documents';
      requestOpts.url = spurl;
      console.log(`Queryng: ${spurl}`);
      const hostUrl = url.parse(spurl, true);
      request.get(requestOpts).then(response => {
        console.log(response);
        res.json(response);
      }).catch(rerror => {
        console.log('The error');
        console.log(rerror);
        res.status(rerror.statusCode).json(rerror.error);
      });
    })
    .catch(err => {
      console.log('Erros');
      console.log(err);
      res.json(err);
    });
});

app.post('/RecuperarDatosCliente/recuperarDatosBasicosCliente', function (req, res) {
  console.log('Recuperar datos');
  let resp = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ "codigoRol": "02", 'estadoVinculacion': '03' })
    }, 1000)
  });
  resp.then(resp => res.json(resp))
    .catch(err => res.json(err));
});

app.post('/ConsultaSaldosCuentasDepositos/consultarSaldosCuentasDepositos', function (req, res) {
  console.log('depositos');
  let resp = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = {
        informacionCuenta: {
          informacionCuentaDepositos: [
            {
              tipoCuenta: 'D',
              numeroCuenta: '00500090325',
              cupoSobregiro: '0.00',
              saldoEfectivo: '2999900.00',
              saldoCanje: '0.00',
              saldoDisponible: '2999900.00',
              saldoPorCobrar: '0.00',
              saldoBloqueado: '0.00',
              saldoCanjeInicioDia: '0.00',
              saldoEfectivoInicioDia: '0.00',
            },
            {
              tipoCuenta: 'S',
              numeroCuenta: '00500090090',
              cupoSobregiro: '0.00',
              saldoEfectivo: '1199900.00',
              saldoCanje: '0.00',
              saldoDisponible: '1199900.00',
              saldoPorCobrar: '0.00',
              saldoBloqueado: '0.00',
              saldoCanjeInicioDia: '0.00',
              saldoEfectivoInicioDia: '0.00',
            }

          ],
        },
      };
      resolve(result);
    }, 1000);
  });
  resp.then(response => {
    res.json(response)
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

function processSPResult(spurl, resut) {
  
}