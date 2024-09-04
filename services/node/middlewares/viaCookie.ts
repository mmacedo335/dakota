import type { ServiceContext } from "@vtex/api";

// Handler que busca o cookie e retorna o valor
export async function viaCookieMiddleware(ctx: ServiceContext) {
  const currentHost = ctx.request.headers["x-forwarded-host"] ||
    ctx.request.hostname;

  // Tempo expiração cookie
  const maxAge = 60 * 60 * 24 * 7; // Expira em 7 dias (em segundos)

  // Obtém o valor customizado do cookie
  const cookieNameCustom = "checkout.vtex.dakota.com";
  const cookieValueCustom = ctx.cookies.get(cookieNameCustom);

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

  // Veririca se o cookie custom não existe no site
  if (!cookieValueCustom) {
    ctx.status = 200;
    ctx.body = {
      success: false,
      message: `Cookie ${cookieNameCustom} não encontrado.`,
    };
    // Definir cookie custom, disponivel em todas lojas DAKOTA (Alterar assim que o site for para produção para o dominio principal da Dakota)
    ctx.set(
      "Set-Cookie",
      `checkout.vtex.dakota.com=${cookieValue}; Max-Age=${maxAge}; Domain=.myvtex.com; Path=/; HttpOnly; Secure; SameSite=None`,
    );
    return;
  }

  // Se ambos os cookies forem encontrados
  if (cookieValueCustom !== cookieValue) {
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: `Valor do cookie ${cookieNameCustom} recuperado com sucesso.`,
      cookieValueCustom,
    };

    // Redefinir o cookie padrão com o valor do cookie customizado
    ctx.set(
      "Set-Cookie",
      `checkout.vtex.com=${cookieValueCustom}; Domain=.${currentHost}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=None`,
    );
  } else {
    ctx.status = 404;
    ctx.body = {
      success: false,
      message:
        `Os valores dos cookies ${cookieNameCustom} e ${cookieName} já são iguais.`,
    };
  }

  // Define cabeçalhos de controle de cache
  ctx.set("Cache-Control", "no-cache no-store must-revalidate");
  ctx.set("Pragma", "no-cache");
  ctx.set("Expires", "0");
}
