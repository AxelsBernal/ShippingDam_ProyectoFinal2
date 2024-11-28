export default function Footer() {
  return (
    <div style={{ backgroundColor: "#232F3E", color: "#FFFFFF", padding: "1rem 0", marginTop: "2rem" }}>
      <div style={{
        display: "flex",
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: "1rem", 
        marginBottom: "1rem"
      }}>
        {/* Bandera de México y Logo de Amazon */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg" 
            alt="Bandera de México" 
            style={{ width: "24px", height: "16px", borderRadius: "2px" }}
          />
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
            alt="Logo de Amazon" 
            style={{ height: "24px" }}
          />
        </div>
        <span style={{ fontSize: "14px", lineHeight: "1.5", textAlign: "center" }}>
          © 2023 Amazon. Todos los derechos reservados. <br />
          <a 
            href="https://www.amazon.com/contact-us" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: "#FF9900", textDecoration: "none" }}
          >
            Contacto
          </a>{" "}
          |{" "}
          <a 
            href="https://www.amazon.com/help" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: "#FF9900", textDecoration: "none" }}
          >
            Servicio al Cliente
          </a>{" "}
          |{" "}
          <a 
            href="https://www.amazon.com/terms" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: "#FF9900", textDecoration: "none" }}
          >
            Términos y Condiciones
          </a>
        </span>
      </div>
    </div>
  );
}
