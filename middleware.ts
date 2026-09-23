import {NextRequest,NextResponse} from 'next/server';

const translatedLocales=new Set(['he','fr','it','hi','zh','ar','pt','ru','es']);

export function middleware(request:NextRequest){
  const url=request.nextUrl.clone();
  const path=url.pathname;
  if(path==='/en'||path.startsWith('/en/')){
    url.pathname=path.slice(3)||'/';
    return NextResponse.redirect(url,308);
  }
  const first=path.split('/')[1];
  const headers=new Headers(request.headers);
  if(first==='he'){
    headers.set('x-plantpal-locale','he');
    url.pathname=path.slice(3)||'/';
    return NextResponse.rewrite(url,{request:{headers}});
  }
  if(translatedLocales.has(first)){
    headers.set('x-plantpal-locale',first);
    return NextResponse.next({request:{headers}});
  }
  headers.set('x-plantpal-locale','en');
  url.pathname='/en'+(path==='/'?'':path);
  return NextResponse.rewrite(url,{request:{headers}});
}

export const config={matcher:['/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)']};
