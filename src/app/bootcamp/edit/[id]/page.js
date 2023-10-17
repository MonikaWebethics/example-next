import Navbar from "components/Layout/Navbar";
import BootcampForm from "components/BootCamp/BootcampForm";
function editBootcamp({ params }) {
  console.log(params.id);
  return (
    <div>
      <Navbar />
      <BootcampForm />
    </div>
  );
}

export default editBootcamp;
