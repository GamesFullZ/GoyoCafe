-- ============================================================================
-- GOYO REAL COFFEE — ROW LEVEL SECURITY (RLS) POLICIES
-- Base de datos: PostgreSQL / Supabase
-- Estándar: Least Privilege Principle (Principio de Mínimo Privilegio)
-- ============================================================================

-- 1. TABLA DE PEDIDOS (Orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_ip_hash TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_preparation', 'ready', 'delivered', 'cancelled')),
    total_items INTEGER NOT NULL CHECK (total_items > 0 AND total_items <= 30),
    total_amount_mxn NUMERIC(10, 2) NOT NULL CHECK (total_amount_mxn >= 0),
    encrypted_payload TEXT NOT NULL,       -- Payload cifrado con AES-256-GCM
    hmac_signature TEXT NOT NULL,          -- Firma de integridad HMAC-SHA256
    notes TEXT,
    order_token TEXT UNIQUE NOT NULL
);

-- 2. HABILITAR ROW LEVEL SECURITY (OBLIGATORIO)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS DE ACCESO (POLICIES)

-- A) POLÍTICA DE INSERCIÓN: Cualquiera (incluso anónimos o clientes) puede crear pedidos,
-- pero el customer_ip_hash y los campos de firma son obligatorios.
CREATE POLICY "Permitir inserción de pedidos validados"
ON public.orders
FOR INSERT
WITH CHECK (
    total_items > 0 AND
    encrypted_payload IS NOT NULL AND
    hmac_signature IS NOT NULL
);

-- B) POLÍTICA DE LECTURA POR CLIENTE (Ownership / Token):
-- El cliente solo puede consultar su propio pedido si es el dueño autenticado
-- O si posee el token único criptográfico emitido para su ticket.
CREATE POLICY "Clientes solo leen sus propios pedidos"
ON public.orders
FOR SELECT
USING (
    (auth.uid() IS NOT NULL AND auth.uid() = customer_id)
    OR
    (order_token = current_setting('request.headers', true)::json->>'x-order-token')
);

-- C) POLÍTICA DE BARISTAS Y ADMINISTRACIÓN:
-- Los baristas y administradores tienen acceso completo para preparar y actualizar estado.
CREATE POLICY "Baristas tienen lectura y actualización de pedidos"
ON public.orders
FOR ALL
USING (
    auth.jwt() ->> 'role' IN ('barista', 'admin', 'service_role')
)
WITH CHECK (
    auth.jwt() ->> 'role' IN ('barista', 'admin', 'service_role')
);

-- D) PROHIBICIÓN ESTRICTA DE ELIMINACIÓN PÚBLICA (Audit Trail):
-- Ningún usuario público puede eliminar registros de pedidos.
CREATE POLICY "Prevenir eliminación no autorizada de pedidos"
ON public.orders
FOR DELETE
USING (
    auth.jwt() ->> 'role' = 'admin'
);

-- 4. ÍNDICES DE ALTO RENDIMIENTO PARA BÚSQUEDAS SEGURAS
CREATE INDEX IF NOT EXISTS idx_orders_token ON public.orders (order_token);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders (status);
