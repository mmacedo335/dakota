import type { ServiceContext } from "@vtex/api";

// Handler que busca o cookie e retorna o valor
export async function viaCookieClearMiddleware(ctx: ServiceContext) {
  // Tempo expiração cookie
  const maxAge = 60 * 60 * 24 * 7; // Expira em 7 dias (em segundos)

  // Obtém o valor do cookie padrão
  const cookieName = "checkout.vtex.com";
  const cookieValue = ctx.cookies.get(cookieName);
 
  // Verifica se o cookie padrão já foi setado no site 
  if (!cookieValue) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: `Cookie ${cookieName} não encontrado.`,
    };
    return;
  }

  // REDEFINI VALOR COM O NOVO COOKIE DEPOIS DO FECHAMENTO DO PEDIDO
  ctx.status = 200;
  ctx.body = {
    success: false,
    message: `Cookie ${cookieName} adicionado`,
  };
  ctx.set(
    "Set-Cookie",
    `checkout.vtex.dakota.com=${cookieValue}; Max-Age=${maxAge}; Domain=.myvtex.com; Path=/; HttpOnly; Secure; SameSite=None`,
  );

  // Define cabeçalhos de controle de cache
  ctx.set("Cache-Control", "no-cache no-store must-revalidate");
  ctx.set("Pragma", "no-cache");
  ctx.set("Expires", "0");
}
