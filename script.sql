--Usuarios (admin, Lautaro, Cesar) CONTRASEÑA (ADMIN12345) misma para 3 usuarios

INSERT INTO users VALUES (DEFAULT, 'admin', 'admin@gmail.com', '$2a$10$11lKDEuFZY9Sunnvxfwvxuo7DNFrhoY/O6wWh9MRYjNoJxY5DYdha', 'Logo.png', 1), 
(DEFAULT, 'Lautaro', 'Lautaro@digitalhouse.com', '$2a$10$11lKDEuFZY9Sunnvxfwvxuo7DNFrhoY/O6wWh9MRYjNoJxY5DYdha', 'Logo.png', 0), 
(DEFAULT, 'Cesar', 'Cesar@digitalhouse.com', '$2a$10$11lKDEuFZY9Sunnvxfwvxuo7DNFrhoY/O6wWh9MRYjNoJxY5DYdha', 'Logo.png', 0)


INSERT INTO products VALUES (DEFAULT, "JBL Quantum 50", "JBLQuantum50.png", "Lleve su juego a otro nivel con un sonido superior. Los JBL Quantum 50 con cable ofrecen un entorno inmersivo gracias al sistema JBL QuantumSOUND Signature y a un preciso posicionamiento de audio. JBL QuantumSURROUND™ genera un espacio sonoro envolvente que le aporta una ventaja en el juego y maximiza su rendimiento. La diadema ligera y las almohadillas de espuma viscoelástica harán que se sienta cómodo en todo momento. Un micrófono vocal de asta abatible facilita la comunicación tanto con aliados como con enemigos.", 4999, 'JBL QuantumSOUND Signature Control total gracias al botón deslizante de volumen y de silenciar el micrófono,  Micrófono para voz integrado en el cable Tecnología TwistlockTM que ofrece confort y estabilidad Multiplataforma', 1), (DEFAULT, "JBL Quantum 100", "JBLQuantum100.jpg", "Convierta el juego en una aventura épica. Con el nuevo estándar JBL QuantumSOUND Signature, los auriculares JBL Quantum 100 le sitúan en el centro de la acción. Un sonido inmersivo y preciso que le permite apreciar todos los matices y sentir todas las explosiones, un micrófono vocal extraíble, y comodidad y ligereza gracias a las almohadillas de espuma viscoelástica. El micrófono de asta desmontable le permite interactuar con varios jugadores y las almohadillas de espuma viscoelástica proporcionan un óptimo confort durante horas. Juegue partidas inolvidables con los auriculares JBL Quantum 100.", 9999, 'Se el polo de atracción del juego con JBL QuantumSOUND Signature, Juega con comodidad durante horas gracias al acolchado viscoelástico, Haz que tu voz suene alta y clara, Compatibles con Windows Sonic Spatial Sound Pensados para tus plataformas favoritas', 1), (DEFAULT, 'JBL Quantum 300', 'JBLQuantum300.jpg', 'Lleve su juego a otro nivel con un sonido superior. Los JBL Quantum 300 con cable ofrecen un entorno inmersivo gracias al sistema JBL QuantumSOUND Signature y a un preciso posicionamiento de audio. JBL QuantumSURROUND™ genera un espacio sonoro envolvente que le aporta una ventaja en el juego y maximiza su rendimiento. La diadema ligera y las almohadillas de espuma viscoelástica harán que se sienta cómodo en todo momento. Un micrófono vocal de asta abatible facilita la comunicación tanto con aliados como con enemigos.', 19999, 'Vive el juego al máximo con JBL QuantumSURROUNDTM, Se el polo de atracción del juego con JBL QuantumSOUND Signature, Juega con comodidad durante horas gracias al acolchado viscoelástico, Hazte oír con el micrófono vocal direccional con asta, Cambia entre tus plataformas favoritas, Intuitivo software JBL QuantumENGINE para PC', 1)

INSERT INTO category VALUES (1, 'auriculares'), (2, 'parlantes'), (3, 'gaming'), (4, 'notebook')
