import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./data/db";
import SanitizedHTML from "./components/SanitizedHTML";
import { MOKKOS_PER_PAGE } from "./data/constants";

function goLastPage(searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    currentPage: (searchParams.currentPage -= 1),
  });
}

function goNextPage(searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    currentPage: (searchParams.currentPage += 1),
  });
}

function toggleSearchContent(searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    searchContent: !searchParams.searchContent,
  });
}

function toggleSearchTags(searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    searchTags: !searchParams.searchTags,
  });
}

function updateQueryString(e, searchParams, setSearchParams) {
  setSearchParams({
    ...searchParams,
    queryString: e.target.value,
  });
}

function ManageMokkos() {
  const [totalMokkoPageCount, setTotalMokkoPageCount] = useState();
  const [mokkos, setMokkos] = useState([]);
  const [searchParams, setSearchParams] = useState({
    currentPage: 0,
    queryString: "",
    searchContent: true,
    searchTags: true,
  });

  useEffect(() => {
    async function getMokkos({
      currentPage,
      queryString,
      searchContent,
      searchTags,
    }) {
      const mokkos = await db.mokkos.filter((mokko) => {
        if (!queryString) {
          return true;
        } else {
          let target = "";
          target = searchContent ? target + mokko.content : target;
          target = searchTags ? target + mokko.tags.toString() : target;
          return target.toLowerCase().includes(queryString.toLowerCase());
        }
      });

      const totalMokkos = await mokkos.count();

      const paginatedMokkos = await mokkos
        .offset(currentPage * MOKKOS_PER_PAGE)
        .limit(MOKKOS_PER_PAGE)
        .toArray();

      setTotalMokkoPageCount(Math.ceil(totalMokkos / MOKKOS_PER_PAGE));
      setMokkos(paginatedMokkos);
    }

    getMokkos(searchParams);
  }, [searchParams]);

  return (
    <div className="grid">
      <div className="justify-self-center prose">
        <h1 className="text-center">Your Mokkos</h1>

        {/* Search Widget */}
        <div className="grid">
          <form className="grid justify-self-center w-5/6">
            <input
              type="text"
              value={searchParams.queryString}
              onChange={(e) => {
                updateQueryString(e, searchParams, setSearchParams);
              }}
              placeholder="Search..."
              disabled={!searchParams.searchContent && !searchParams.searchTags}
              className="input input-bordered w-full justify-self-center"
            />
            <div className="flex flex-row flex-wrap justify-evenly gap-x-4 mt-2">
              <label className="label">
                Search content
                <input
                  type="checkbox"
                  checked={searchParams.searchContent}
                  onChange={() =>
                    toggleSearchContent(searchParams, setSearchParams)
                  }
                  className="checkbox ml-2"
                />
              </label>
              <label className="label">
                Search tags
                <input
                  type="checkbox"
                  checked={searchParams.searchTags}
                  onChange={() =>
                    toggleSearchTags(searchParams, setSearchParams)
                  }
                  className="checkbox ml-2"
                />
              </label>
            </div>
          </form>
        </div>

        {/* Mokkos List */}
        <div className="divider"></div>
        {mokkos.map((mokko) => (
          <div key={mokko.id}>
            {/* undo font-styling applied by `prose` class to link-text*/}
            <Link to={`${mokko.id}`} className="no-underline font-normal">
              <div className="card card-bordered shadow-lg shadow-gray-500">
                <div className="card-body">
                  <SanitizedHTML content={mokko.content} />
                </div>
              </div>
            </Link>
            <div className="divider"></div>
          </div>
        ))}

        {/* Paginator */}
        {totalMokkoPageCount > 1 && (
          <div className="grid my-9">
            <div className="btn-group justify-self-center">
              <button
                className="btn"
                disabled={searchParams.currentPage === 0}
                onClick={() => goLastPage(searchParams, setSearchParams)}
              >
                «
              </button>
              <button className="btn">{`Page ${
                searchParams.currentPage + 1
              } (of ${totalMokkoPageCount})`}</button>
              <button
                className="btn"
                disabled={searchParams.currentPage === totalMokkoPageCount - 1}
                onClick={() => goNextPage(searchParams, setSearchParams)}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMokkos;
