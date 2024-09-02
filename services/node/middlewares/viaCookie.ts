import type { ServiceContext } from '@vtex/api'

// Handler que busca o cookie e retorna o valor
export async function viaCookieMiddleware(ctx: ServiceContext) {
  const cookieName = 'checkout.vtex.com'; // Substitua pelo nome do cookie que você quer buscar
  const cookieValue = ctx.cookies.get(cookieName); // Obtém o valor do cookie HttpOnly

  if (cookieValue) {
    ctx.status = 200; 
    ctx.body = {
      success: true,
      message: `Valor do cookie ${cookieName} recuperado com sucesso.`,
      cookieValue,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      success: false,
      message: `Cookie ${cookieName} não encontrado.`,
    };
  }

  // Define cabeçalhos de controle de cache
  ctx.set('Cache-Control', 'no-cache no-store must-revalidate');
  ctx.set('Pragma', 'no-cache');
  ctx.set('Expires', '0');
}
