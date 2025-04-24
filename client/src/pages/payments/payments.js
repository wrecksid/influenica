import React from 'react'
import "./payments.css"
import { useNavigate, useParams } from 'react-router-dom';


const Payments = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const goback=()=>{
        navigate(`/orders/${id}`);
    }
  return (
    <div>
        <section className="p-4 p-md-5 ">
  <div className="row d-flex justify-content-center ">
    <div className="col-md-10 col-lg-8 col-xl-5 ">
      <div className="card rounded-3 boooox">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h3>Payments</h3>
            {/* <h6>Payment</h6> */}
          </div>
          <form action="">
            <p className="fw-bold mb-4 pb-2">Saved cards:</p>

            <div className="d-flex flex-row align-items-center mb-4 pb-1">
              <img className="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
              <div className="flex-fill mx-3">
                <div data-mdb-input-init className="form-outline">
                  <input type="text" id="formControlLgXc" className="inputPayment form-control form-control-lg"
                    placeholder="**** **** **** 3193" />
                  <label className="form-label" for="formControlLgXc">Card Number</label>
                </div>
              </div>
              <a href="#!">Remove card</a>
            </div>

            <div className="d-flex flex-row align-items-center mb-4 pb-1">
              <img className="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png" />
              <div className="flex-fill mx-3">
                <div data-mdb-input-init className="form-outline">
                  <input type="text" id="formControlLgXs" className="inputPayment form-control form-control-lg"
                    placeholder="**** **** **** 4296" />
                  <label className="form-label" for="formControlLgXs">Card Number</label>
                </div>
              </div>
              <a href="#!">Remove card</a>
            </div>

            <p className="fw-bold mb-4">Add new card:</p>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="text" id="formControlLgXsd" className="inputPayment form-control form-control-lg"
                placeholder="Anna Doe" />
              <label className="form-label" for="formControlLgXsd">Cardholder's Name</label>
            </div>

            <div className="row mb-4">
              <div className="col-7">
                <div data-mdb-input-init className="form-outline">
                  <input type="text" id="formControlLgXM" className="inputPayment form-control form-control-lg"
                    placeholder="1234 5678 1234 5678" />
                  <label className="form-label" for="formControlLgXM">Card Number</label>
                </div>
              </div>
              <div className="col-3">
                <div data-mdb-input-init className="form-outline">
                  <input type="password" id="formControlLgExpk" className="inputPayment form-control form-control-lg"
                    placeholder="MM/YYYY" />
                  <label className="form-label" for="formControlLgExpk">Expire</label>
                </div>
              </div>
              <div className="col-2">
                <div data-mdb-input-init className="form-outline">
                  <input type="password" id="formControlLgcvv" className="inputPayment form-control form-control-lg"
                    placeholder="Cvv" />
                  <label className="form-label" for="formControlLgcvv">Cvv</label>
                </div>
              </div>
            </div>

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg btn-block"
            onClick={goback}
            >Make Payment</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Payments