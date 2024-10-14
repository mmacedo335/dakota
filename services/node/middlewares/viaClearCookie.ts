import type { ServiceContext } from "@vtex/api";

// Definir constantes para nomes de cookies e domínio
const COOKIE_NAME_CUSTOM = "checkout.vtex.dakota.com";
const COOKIE_NAME = "checkout.vtex.com";
const DOMAIN = ".dakota.com.br";

export async function viaCookieClearMiddleware(ctx: ServiceContext) {
  try {
    // Tempo expiração cookie (7 dias em segundos)
    const maxAge = 60 * 60 * 24 * 7;

    // Obtém o valor do cookie padrão
    const cookieValue = ctx.cookies.get(COOKIE_NAME);

    // Verifica se o cookie padrão já foi setado no site
    if (!cookieValue) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: `Cookie ${COOKIE_NAME} não encontrado.`,
      };
      return;
    }

    // Redefinir valor do cookie customizado com o valor do cookie padrão
    ctx.set(
      "Set-Cookie",
      `${COOKIE_NAME_CUSTOM}=${cookieValue}; Max-Age=${maxAge}; Domain=${DOMAIN}; Path=/; HttpOnly; Secure; SameSite=None`,
    );

    // Retornar sucesso
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: `Cookie ${COOKIE_NAME_CUSTOM} adicionado com sucesso.`,
    };

    // Define cabeçalhos de controle de cache
    ctx.set("Cache-Control", "no-cache, no-store, must-revalidate");
    ctx.set("Pragma", "no-cache");
    ctx.set("Expires", "0");

  } catch (error) {
    // Em caso de erro inesperado
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "Erro interno no servidor.",
      error: error.message,
    };
  }
}
