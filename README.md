This is a simple meteor app that has two collections (Test, User)
The app starts with a table view of all records from Test collection, where 'user' field is a joined document from User collection.
To test the render time, click 'Change template' button, and then click 'Show table'. After rendering the whole template console.log() indicates time take for rendering (in miliseconds)

	meteor
Render time on 0.6.6.3: -/+ 290 ms

	meteor --release template-engine-preview-5
Render time on template-engine-preview-5: -/+ 1250 ms

Additionally, the joined User collection is not loaded with all documents in the template, in all rows after Ctrl+R (hard refresh) on themplate-engine-preview-5 release
