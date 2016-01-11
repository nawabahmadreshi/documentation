
##Link Export

| Key | Value
| --- | ---
|creation_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|link_id| int |
|branch_identity_id| int |
|channel| string |
|feature| string |
|campaign| string |
|stage| string |
|tags| string |
|data| stringified JSON |
|creation_source| string |
|alias| string |
|domain| string |
|url| string |


##Link Click Export

| Key | Value
| --- | --- 
|click_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|branch_link_click_id| int |
|branch_browser_fingerprint_id| int |
|os| string |
|os_version| string |
|model| string |
|browser| string |
|user_agent| string |
|ip_address| string |
|stage| string |
|sms_from_desktop| boolean |
|phone_number| string | 
|redirect_method| string |
|link_creation_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|link_channel| string |
|link_feature| string |
|link_campaign| string |
|link_stage| string |
|link_tags| string |
|link_data| stringified JSON |
|link_creation_source| string |
|link_url| string |
|link_branch_identity_id| int |
|link_id| int |
|query_params| stringified JSON |


##Event Export

| Key | Value
| --- | ---
|id| int |
|name| string | 
|metadata| stringified JSON |
|timestamp| datetime %Y-%m-%dT%H:%M:%S |
|branch_identity_id| int |
|developer_identity| string |
|identity_creation_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|branch_session_id| int | 
|app_version| string |
|ip_address| string |
|session_start_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|branch_device_fingerprint_id| int |
|device_first_seen_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|device_os| string |
|device_os_version| string |
|device_metadata|stringified JSON |
|hardware_id|string |
|google_advertising_id|string |
|branch_browser_fingerprint_id| string|
|browser_first_seen_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|browser_os| string |
|browser_os_version|string|
|user_agent| string |
|first_referring_click_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|first_referring_click_query_params| stringified JSON |
|first_referring_branch_identity_id| int |
|first_referring_developer_identity| string |
|first_referring_hardware_id| string |
|first_referring_branch_link_id| int |
|first_referring_link_creation_timestamp| datetime %Y-%m-%dT%H:%M:%S |
|first_referring_link_channel| string |
|first_referring_link_feature|string |
|first_referring_link_campaign|string |
|first_referring_link_stage|string |
|first_referring_link_tags|string |
|first_referring_link_data|stringified JSON |
|first_referring_link_creation_source|string |
|first_referring_link_url|string |
|session_referring_click_timestamp|datetime %Y-%m-%dT%H:%M:%S |
|session_referring_click_query_params| stringified JSON |
|session_referring_branch_identity_id| int |
|session_referring_developer_identity| int |
|session_referring_hardware_id|string |
|session_referring_branch_link_id|string |
|session_referring_link_creation_timestamp|datetime %Y-%m-%dT%H:%M:%S |
|session_referring_link_channel| string |
|session_referring_link_feature|string |
|session_referring_link_campaign|string |
|session_referring_link_stage|string |
|session_referring_link_tags|string |
|session_referring_link_data|stringified JSON |
|session_referring_link_creation_source| string |
|session_referring_link_url|string |
|first_referring_click_id|int |
|session_referring_click_id|int |

