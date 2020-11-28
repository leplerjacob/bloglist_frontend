import React from 'react'

const Notification = ({props}) => {
    console.log(props);
    const success = props.success
    const message = props.message
    console.log("success:", success, "message: ", message);

    return (
      <div>
        {success ? (
          <h2 className="notify success">{message}</h2>
        ) : (
          <h2 className="notify failed">{message}</h2>
        )}
      </div>
    )
}

export default Notification
