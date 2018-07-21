const _isDev = window.location.port.indexOf('1332') > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const apiURI = _isDev ? 'http://localhost:1332/v1/' : `http://localhost:1332/v1/`;
const serverURI = _isDev ? 'http://localhost:1332/' : `http://localhost:1332/`;

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI,
  AUTHOR: 'Somesh',
  SERVER_URL:serverURI,
  HELP_MAX_FILES:5,
  HELP_MAX_SIZE:10,
  LOCKER_MAX_FILES:5,
  SUMMER_SETUP:{
    toolbar:[
      ['style', ['style']],
      ['font', ['bold', 'underline', 'italic']],
      ['para', ['ul', 'ol', 'paragraph','hr']],
      ['table', ['table']],
      ['insert', ['link', 'picture']],
      ['view', ['codeview']],
      ['myButton', ['save']]
    ]
}
};