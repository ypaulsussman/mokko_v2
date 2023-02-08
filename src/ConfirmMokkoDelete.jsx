import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "./data/db";

function ConfirmMokkoDelete() {
  const navigate = useNavigate();
  const { mokkoId } = useParams();

  const deleteMokko = async (e) => {
    e.preventDefault();

    await db.mokkos.delete(Number(mokkoId));

    navigate("/manage/mokkos");
  };

  return (
    <div className="grid mb-12">
      <div className="justify-self-center prose mb-4">
        <h1 className="text-center mb-0">Confirm Mokko Deletion</h1>
        <p>
          If you&apos;re not 100% sure, you may want to{" "}
          <Link to={"/manage/settings"} className="link">
            export a snapshot
          </Link>{" "}
          of your data prior to removal.
        </p>

        <div className="flex justify-end my-8">
          <button
            type="button"
            className="btn btn-outline"
            onClick={deleteMokko}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmMokkoDelete;
