
CREATE OR REPLACE FUNCTION get_client_count()
RETURNS INT AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM clients);
END;
$$ LANGUAGE plpgsql;
