import type { ServiceContext } from "@vtex/api";

// Definir constantes para nomes de cookies e domínio
const COOKIE_NAME_CUSTOM = "checkout.vtex.dakota.com";
const COOKIE_NAME = "checkout.vtex.com";
const DOMAIN = ".dakota.com.br";

// Handler que busca o cookie e retorna o valor
export async function viaCookieMiddleware(ctx: ServiceContext) {
  try {
    const currentHost = ctx.request.headers["x-forwarded-host"] || ctx.request.hostname;
    const maxAge = 60 * 60 * 24 * 7; // Expira em 7 dias (em segundos)

    // Obtém o valor customizado do cookie  
    const cookieValueCustom = ctx.cookies.get(COOKIE_NAME_CUSTOM);
    // const cookieValue = ctx.cookies.get(COOKIE_NAME); 

    const cookieHeader = ctx.request.headers['cookie'];
    const cookiePattern = /checkout\.vtex\.com=([^;]+)/;
    const cookieValue = String(cookieHeader ? cookieHeader.match(cookiePattern) : undefined);

    // Verifica se o cookie padrão já foi setado no site 
    if (!cookieValue) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        message: `Cookie ${COOKIE_NAME} não encontrado.. ---- ${ctx.cookies}`,
      };
      return;
    }

    // Verifica se o cookie customizado não existe
    if (!cookieValueCustom) {
      // Define cookie customizado para o domínio especificado
      ctx.set(
        "Set-Cookie",
        `${COOKIE_NAME_CUSTOM}=${cookieValue}; Max-Age=${maxAge}; Domain=${DOMAIN}; Path=/; HttpOnly; Secure; SameSite=None`,
      );
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: `Cookie ${COOKIE_NAME_CUSTOM} não encontrado. Novo cookie definido.`,
      };
      return;
    }

    // Se ambos os cookies forem encontrados e os valores forem diferentes
    if (cookieValueCustom !== cookieValue) {
      ctx.set(
        "Set-Cookie",
        `${COOKIE_NAME}=${cookieValueCustom}; Domain=.${currentHost}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=None`,
      );
      ctx.status = 200;
      ctx.body = {
        success: true,
        message: `Valor do cookie ${COOKIE_NAME_CUSTOM} recuperado com sucesso.`,
        cookieValueCustom,
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: `Os valores dos cookies ${COOKIE_NAME_CUSTOM} e ${COOKIE_NAME} já são iguais.`,
      };
    }

    // Define cabeçalhos de controle de cache
    ctx.set("Cache-Control", "no-cache, no-store, must-revalidate");
    ctx.set("Pragma", "no-cache");
    ctx.set("Expires", "0");

  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "Erro interno no servidor.",
      error: error.message,
    };
  }
}
