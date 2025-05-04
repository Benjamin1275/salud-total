CREATE TABLE pacientes (
    idPaciente SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    fecNac DATE NOT NULL,
    telefono INT NOT NULL,
    eMail VARCHAR(100) NOT NULL,
    fecReg DATE DEFAULT CURRENT_DATE NOT NULL,
    estado VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pacientes (name, fecNac, telefono, eMail, estado) VALUES
('Juan Perez', '1985-06-15', 1234567890, 'juan.perez@gmail.com', 'pendiente'),
('Maria Lopez', '1990-03-22', 9876543210, 'maria.lopez@gmail.com', 'pendiente'),
('Carlos Gomez', '1978-11-05', 1122334455, 'carlos.gomez@gmail.com', 'pendiente'),
('Ana Torres', '1982-07-19', 5566778899, 'ana.torres@gmail.com', 'pendiente'),
('Luis Martinez', '1995-01-30', 6677889900, 'luis.martinez@gmail.com', 'pendiente');