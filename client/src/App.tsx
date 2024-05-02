//importar telas e indicar rotas para renderização
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/account/Login/Login";
import Register from "./pages/account/register/Register";
import Cadastro from "./pages/admin/cadastro/cadastro";
import Consultar from "./pages/admin/consulta/consultar";
import EditarCad from "./pages/admin/editar/editar";
import Excluir from "./pages/admin/inativar/inativar";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} ></Route>
          <Route path="/cad/empresa" element={<Cadastro />} ></Route>
          <Route path="/consulta/empresa" element={<Consultar />} ></Route>
          <Route path="/editarCad/empresa" element={<EditarCad />} ></Route>
          <Route path="/registrar/usuario" element={<Register />} ></Route>
          <Route path="/inativar/empresa" element={<Excluir />} ></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
