function _dim(x) {
  var ret = [];
  while(typeof x === "object") {
    ret.push(x.length); x = x[0];
  }
  return ret;
};

exports.dim = function dim(x) {
  var y,z;
  if(typeof x === "object") {
    y = x[0];
    if(typeof y === "object") {
      z = y[0];
      if(typeof z === "object") {
        return _dim(x);
      }
      return [x.length,y.length];
    }
    return [x.length];
  }
  return [];
};

exports.diag = function diag(d) {
  var i,i1,j,n = d.length, A = Array(n), Ai;
  for(i=n-1;i>=0;i--) {
    Ai = Array(n);
    i1 = i+2;
    for(j=n-1;j>=i1;j-=2) {
      Ai[j] = 0;
      Ai[j-1] = 0;
    }
    if(j>i) { Ai[j] = 0; }
    Ai[i] = d[i];
    for(j=i-1;j>=1;j-=2) {
      Ai[j] = 0;
      Ai[j-1] = 0;
    }
    if(j===0) {
      Ai[0] = 0;
    }
    A[i] = Ai;
  }
  return A;
};

exports.rep = function rep(s,v,k) {
  if(k === undefined) {
    k=0;
  }
  var n = s[k], ret = Array(n), i;
  if(k === s.length-1) {
    for(i=n-2;i>=0;i-=2) {
      ret[i+1] = v; ret[i] = v;
    }
    if(i===-1) {
      ret[0] = v;
    }
    return ret;
  }
  for(i=n-1;i>=0;i--) {
    ret[i] = exports.rep(s,v,k+1);
  }
  return ret;
};

exports.identity = function identity(n) {
  return exports.diag(exports.rep([n],1));
};

exports.dotMMsmall = function dotMMsmall (x,y) {
  var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
  p = x.length; q = y.length; r = y[0].length;
  ret = Array(p);
  for(i=p-1;i>=0;i--) {
    foo = Array(r);
    bar = x[i];
    for(k=r-1;k>=0;k--) {
      woo = bar[q-1]*y[q-1][k];
      for(j=q-2;j>=1;j-=2) {
          i0 = j-1;
          woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
      }
      if(j===0) {
        woo += bar[0]*y[0][k];
      }
      foo[k] = woo;
    }
    ret[i] = foo;
  }
  return ret;
};

exports.dotMMbig = function dotMMbig (x,y) {
  function gc(A,j,x) {
      var n = A.length, i;
      for(i=n-1;i>0;--i) {
          x[i] = A[i][j];
          --i;
          x[i] = A[i][j];
      }
      if(i===0) x[0] = A[0][j];
  }
  var p = y.length, v = Array(p);
  var m = x.length, n = y[0].length, A = new Array(m), xj;
  var VV = exports.dotVV;
  var i,j,k,z;
  --p;
  --m;
  for(i=m;i!==-1;--i) A[i] = Array(n);
  --n;
  for(i=n;i!==-1;--i) {
      gc(y,i,v);
      for(j=m;j!==-1;--j) {
          z=0;
          xj = x[j];
          A[j][i] = VV(xj,v);
      }
  }
  return A;
};

exports.dotMV = function dotMV (x,y) {
  var p = x.length, q = y.length,i;
  var ret = Array(p), dotVV = exports.dotVV;
  for(i=p-1;i>=0;i--) {
    ret[i] = dotVV(x[i],y);
  }
  return ret;
};

exports.dotVM = function dotVM (x,y) {
  var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
  p = x.length; q = y[0].length;
  ret = Array(q);
  for(k=q-1;k>=0;k--) {
    woo = x[p-1]*y[p-1][k];
    for(j=p-2;j>=1;j-=2) {
      i0 = j-1;
      woo += x[j]*y[j][k] + x[i0]*y[i0][k];
    }
    if(j===0) {
      woo += x[0]*y[0][k];
    }
    ret[k] = woo;
  }
  return ret;
};

exports.dotVV = function dotVV (x,y) {
  var i,n=x.length,i1,ret = x[n-1]*y[n-1];
  for(i=n-2;i>=1;i-=2) {
    i1 = i-1;
    ret += x[i]*y[i] + x[i1]*y[i1];
  }
  if(i===0) {
    ret += x[0]*y[0];
  }
  return ret;
};

exports.mulVS = function mulVS (x,y) {
  var _n = x.length;
  var i, ret = Array(_n);

  for(i=_n-1;i!==-1;--i) {
    ret[i] = x[i] * y;
  }
  return ret;
};

exports.mulSV = function mulSV (x,y) {
  var _n = y.length;
  var i, ret = Array(_n);

  for(i=_n-1;i!==-1;--i) {
    ret[i] = x * y[i];
  }

  return ret;
};
